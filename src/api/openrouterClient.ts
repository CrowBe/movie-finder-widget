const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Ordered list of free models. OpenRouter will try each in sequence if one is
// rate-limited or unavailable, so a transient 429 on one provider won't fail
// the whole request.
const FREE_MODELS = [
    "meta-llama/llama-3.2-3b-instruct:free",
    "qwen/qwen-2.5-7b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
];

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

    const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "Movie Finder Widget",
        },
        body: JSON.stringify({
            // Pass all models with route:"fallback" so OpenRouter automatically
            // tries the next model if the current one is rate-limited (429).
            models: FREE_MODELS,
            route: "fallback",
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
