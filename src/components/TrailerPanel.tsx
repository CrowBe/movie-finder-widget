import { useEffect } from "react";
import { useConfigContext } from "../context";

const TrailerPanel = () => {
    const { youtubeId, setYoutubeId } = useConfigContext();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setYoutubeId("");
        };
        if (youtubeId) {
            document.addEventListener("keydown", onKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [youtubeId, setYoutubeId]);

    if (!youtubeId) return null;

    return (
        <div
            id="modal-trailer-panel"
            onClick={(e) => e.target === e.currentTarget && setYoutubeId("")}
            role="dialog"
            aria-modal="true"
            aria-label="Trailer"
        >
            <div className="trailer-container">
                <button
                    className="trailer-close-btn"
                    onClick={() => setYoutubeId("")}
                    aria-label="Close trailer"
                >
                    ✕
                </button>
                <iframe
                    title={youtubeId}
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default TrailerPanel;
