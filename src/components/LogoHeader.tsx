import { useState } from "react";
import logo from "../assets/Logo@2x.png";
import tmdbLogo from "../assets/tmdb_logo.svg";

const LogoHeader = ({ onAiClick }: { onAiClick: () => void }) => {
    const [aboutOpen, setAboutOpen] = useState(false);

    return (
        <header className="app-header">
            <div className="header-top">
                <div className="logos">
                    <img
                        src={logo}
                        alt="Movie Finder"
                        className="app-logo"
                    />
                    <img
                        src={tmdbLogo}
                        alt="The Movie Database"
                        className="tmdb-logo"
                    />
                </div>
                <div className="header-actions">
                    <button
                        className="ai-trigger-btn"
                        onClick={onAiClick}
                        aria-label="Open AI recommendations"
                    >
                        <span className="sparkle">✨</span>
                        <span className="ai-btn-label">AI Picks</span>
                    </button>
                    <button
                        className={`about-btn${aboutOpen ? " open" : ""}`}
                        onClick={() => setAboutOpen((o) => !o)}
                        aria-expanded={aboutOpen}
                    >
                        About <span className="chevron" />
                    </button>
                </div>
            </div>

            {aboutOpen && (
                <div className="about-dropdown">
                    <p>
                        Movie Finder is a fast, modern interface for discovering
                        movies, TV shows, and people. Built with React + Vite
                        and powered by{" "}
                        <a
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            The Movie Database API
                        </a>
                        . Learn more in their{" "}
                        <a
                            href="https://developers.themoviedb.org/3/getting-started/introduction"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            API docs
                        </a>
                        .
                    </p>
                    <img src={tmdbLogo} alt="The Movie Database logo" />
                </div>
            )}
        </header>
    );
};

export default LogoHeader;
