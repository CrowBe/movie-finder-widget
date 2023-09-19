import { useState } from 'react';
import searchIcon from '../assets/Icons-search@1x.png'

const SearchBar = (props) => {
    // State setter for setting a search query.
    const { query, setQuery, setPage } = props;
    // local piece of state to ensure the text input is controlled
    const [ input, setInput ] = useState('');

    // Event handler that handles search submission by passing current input state to query setter
    const onSearchSubmit = (event) => {
        setQuery(input);
        event.preventDefault();
        document.getElementById("search-clear-button")?.classList.add("shown");
    };

    const clearQuery = (event) => {
        setInput("")
        setQuery("");
        setPage(1);
        event.target.classList.remove("shown");
        event.preventDefault();
    }

    const onSearchChange = (event) => {
        setInput(event.target.value)
        // If the user manually removes the search term. Set the query back to nothing and
        // hide the clear button.
        if (event.target.value === "" && query !== "") {
            setQuery("");
            document.getElementById("search-clear-button")?.classList.remove("shown");
        }
    }

    // basic search bar
    return (
        <div id="search-bar-container">
            <form id="search-bar" onSubmit={onSearchSubmit}>
                <div>
                    <label htmlFor="input"><img src={searchIcon} alt="magnifying glass"/></label>
                    <input type="text" id="input" name="input" value={input} onChange={onSearchChange} placeholder="Search for movies, tv shows or people..."/>
                    <input type="submit" value="Search" form="search-bar" />
                </div>
            </form>
            <button onClick={clearQuery} id="search-clear-button">clear</button>
        </div>
    )
}

export default SearchBar;