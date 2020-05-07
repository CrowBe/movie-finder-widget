import React, { useState } from'react';
import searchIcon from '../assets/Icons-search@1x.png'

const SearchBar = (props) => {
    // State setter for setting a search query.
    const { setQuery } = props;
    // local piece of state to ensure the text input is controlled
    const [ input, setInput ] = useState('');

    // Event handler that handles search submission by passing current input state to query setter
    const onSearchSubmit = (event) => {
        setQuery(input);
        event.preventDefault();
    };

    // basic search bar
    return (
        <form id="search-bar" onSubmit={onSearchSubmit}>
            <div>
                <label htmlFor="input"><img src={searchIcon} alt="magnifying glass"/></label>
                <input type="text" id="input" name="input" value={input} onChange={event => setInput(event.target.value)} placeholder="Search for movies, tv shows or people..."/>
                <input type="submit" value="Search" form="search-bar" />
            </div>
        </form>
    )
}

export default SearchBar;