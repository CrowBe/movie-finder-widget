import { useState } from "react";

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

const SearchBar = ({
    query,
    setQuery,
    setPage,
}: {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [input, setInput] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQuery(input);
        setPage(1);
    };

    const onClear = () => {
        setInput("");
        setQuery("");
        setPage(1);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInput(value);
        if (value === "" && query !== "") {
            setQuery("");
        }
    };

    return (
        <div className="search-section">
            <form className="search-form" onSubmit={onSubmit} role="search">
                <label className="search-icon" htmlFor="search-input" aria-label="Search">
                    <SearchIcon />
                </label>
                <input
                    type="text"
                    id="search-input"
                    name="q"
                    value={input}
                    onChange={onChange}
                    placeholder="Search movies, TV shows, or people…"
                    autoComplete="off"
                    aria-label="Search movies, TV shows, or people"
                />
                <button
                    type="button"
                    className={`clear-btn${input ? " visible" : ""}`}
                    onClick={onClear}
                    aria-label="Clear search"
                >
                    ✕
                </button>
                <input
                    type="submit"
                    value="Search"
                    className="search-submit"
                    aria-label="Submit search"
                />
            </form>
        </div>
    );
};

export default SearchBar;
