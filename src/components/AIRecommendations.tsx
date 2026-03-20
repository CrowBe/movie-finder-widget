import { useEffect, useState } from "react";
import { getAiRecommendations } from "../api/openrouterClient";

type Status = "idle" | "loading" | "done" | "error";

const AIRecommendations = ({
    onClose,
    searchContext,
}: {
    onClose: () => void;
    searchContext: string;
}) => {
    const [prompt, setPrompt] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [results, setResults] = useState<AiRecommendation[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    const generate = async () => {
        setStatus("loading");
        setError("");
        setResults([]);
        try {
            const recs = await getAiRecommendations(searchContext, prompt);
            setResults(recs);
            setStatus("done");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            setStatus("error");
        }
    };

    const hasApiKey = Boolean(import.meta.env.OPENROUTER_API_KEY);

    return (
        <div
            id="ai-panel"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-label="AI recommendations"
        >
            <div className="ai-panel-card">
                <div className="ai-panel-header">
                    <div className="ai-panel-title">
                        <h2>✨ AI Picks</h2>
                        <p>
                            Powered by{" "}
                            <a
                                href="https://openrouter.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#a5b4fc" }}
                            >
                                OpenRouter
                            </a>{" "}
                            · free models
                        </p>
                    </div>
                    <button
                        className="ai-close-btn"
                        onClick={onClose}
                        aria-label="Close AI panel"
                    >
                        ✕
                    </button>
                </div>

                <div className="ai-panel-body">
                    {!hasApiKey && (
                        <div className="ai-error">
                            Set <code>OPENROUTER_API_KEY</code> in your
                            environment to enable AI recommendations.
                        </div>
                    )}

                    {searchContext && (
                        <div className="ai-context-note">
                            📍 Context: searching for "{searchContext}"
                        </div>
                    )}

                    <div className="ai-prompt-row">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={
                                searchContext
                                    ? "e.g. More like these but scarier, or from the 90s…"
                                    : "e.g. Great sci-fi films from the last decade…"
                            }
                            rows={2}
                            disabled={!hasApiKey || status === "loading"}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    generate();
                                }
                            }}
                        />
                        <button
                            className="ai-generate-btn"
                            onClick={generate}
                            disabled={!hasApiKey || status === "loading"}
                        >
                            {status === "loading" ? "Thinking…" : "Get picks"}
                        </button>
                    </div>

                    {status === "loading" && (
                        <div className="ai-loading">
                            <div className="ai-spinner" aria-hidden="true" />
                            Generating recommendations…
                        </div>
                    )}

                    {status === "error" && (
                        <div className="ai-error">{error}</div>
                    )}

                    {status === "done" && results.length > 0 && (
                        <div className="ai-results">
                            {results.map((rec, i) => (
                                <div key={i} className="ai-result-item">
                                    <div className="ai-result-title">
                                        {rec.title}
                                    </div>
                                    <div className="ai-result-desc">
                                        {rec.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <p className="ai-disclaimer">
                        AI recommendations may be inaccurate. Always verify
                        with TMDB.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIRecommendations;
