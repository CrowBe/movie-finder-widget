import { SetStateAction, useState } from "react";
import searchIcon from "../assets/Icons-search@1x.png";

const SearchBar = (props: {
    query: string;
    setQuery: React.Dispatch<SetStateAction<string>>;
    setPage: React.Dispatch<SetStateAction<number>>;
}) => {
    // State setter for setting a search query.
    const { query, setQuery, setPage } = props;
    // local piece of state to ensure the text input is controlled
    const [input, setInput] = useState("");

    // Event handler that handles search submission by passing current input state to query setter
    const onSearchSubmit = (event: React.FormEvent) => {
        setQuery(input);
        event.preventDefault();
        document.getElementById("search-clear-button")?.classList.add("shown");
    };

    const clearQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInput("");
        setQuery("");
        setPage(1);
        event.currentTarget.classList.remove("shown");
        event.preventDefault();
    };

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
        // If the user manually removes the search term. Set the query back to nothing and hide the clear button
        if (event.currentTarget.value === "" && query !== "") {
            setQuery("");
            document
                .getElementById("search-clear-button")
                ?.classList.remove("shown");
        }
    };

    // basic search bar
    return (
        <div id="search-bar-container">
            <form id="search-bar" onSubmit={onSearchSubmit}>
                <label htmlFor="input">
                    <img src={searchIcon} alt="magnifying glass" />
                </label>
                <input
                    type="text"
                    id="input"
                    name="input"
                    value={input}
                    onChange={onSearchChange}
                    placeholder="Search for movies, tv shows or people..."
                />
                <button
                    onClick={clearQuery}
                    type="button"
                    id="search-clear-button"
                >
                    clear
                </button>
                <input type="submit" value="Search" form="search-bar" />
            </form>
        </div>
    );
};

export default SearchBar;
