const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Diverse free models from different providers/backends.
// More variety = lower chance every model is rate-limited simultaneously.
// Ordered from most-capable to least so OpenRouter's fallback logic
// tries the best option first.
const FREE_MODELS = [
    "meta-llama/llama-3.3-70b-instruct:free",   // Meta / multiple providers
    "deepseek/deepseek-chat-v3-0324:free",        // DeepSeek
    "qwen/qwen3-235b-a22b:free",                  // Alibaba Cloud
    "google/gemini-2.0-flash-exp:free",           // Google
    "mistralai/mistral-small-3.1-24b-instruct:free", // Mistral
    "meta-llama/llama-3.2-3b-instruct:free",      // Lighter fallback
];

// Provider preferences: sort by throughput across ALL model/provider combos
// (partition:"none" disables per-model grouping so the router picks the
// single fastest available endpoint globally, then falls back down the list).
const PROVIDER_PREFERENCES = {
    sort: "throughput",
    partition: "none",
};

const RETRY_DELAYS_MS = [2000, 4000]; // two retries: 2 s then 4 s

async function fetchWithRetry(
    url: string,
    options: RequestInit,
    retryDelays: number[] = RETRY_DELAYS_MS
): Promise<Response> {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= retryDelays.length; attempt++) {
        if (attempt > 0) {
            await new Promise((resolve) => setTimeout(resolve, retryDelays[attempt - 1]));
        }
        const response = await fetch(url, options);
        // Only retry on upstream rate-limit; all other errors surface immediately.
        if (response.status !== 429) {
            return response;
        }
        lastError = new Error(
            `OpenRouter error 429 (attempt ${attempt + 1}/${retryDelays.length + 1}): ` +
            await response.text()
        );
    }
    throw lastError;
}

export async function getAiRecommendations(
    context: string,
    userPrompt: string
): Promise<AiRecommendation[]> {
    const apiKey = import.meta.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("VITE_OPENROUTER_API_KEY is not set");

    const systemPrompt = `You are a knowledgeable film and TV expert. The user is browsing a movie discovery app.
Given context about what they're currently viewing and their request, recommend exactly 5 titles.

Respond ONLY with a valid JSON array — no markdown fences, no explanation — like this:
[
  { "title": "Title (Year)", "description": "One or two sentences about why they'd enjoy it." },
  ...
]`;

    const userMessage = context
        ? `Context: ${context}\n\nUser request: ${userPrompt || "Recommend similar titles I might enjoy."}`
        : userPrompt || "Recommend popular films and TV shows right now.";

    const response = await fetchWithRetry(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "Movie Finder Widget",
        },
        body: JSON.stringify({
            // Pass all models; OpenRouter tries each in sequence on failure.
            models: FREE_MODELS,
            route: "fallback",
            // Sort by throughput globally across all fallback models/providers.
            provider: PROVIDER_PREFERENCES,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage },
            ],
            temperature: 0.7,
            max_tokens: 600,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`OpenRouter error ${response.status}: ${text}`);
    }

    const data = await response.json();
    const content: string = data.choices?.[0]?.message?.content ?? "[]";

    // Strip any accidental markdown fences before parsing
    const cleaned = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as AiRecommendation[];
}
