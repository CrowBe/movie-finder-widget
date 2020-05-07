import React, { useState } from'react';
import searchIcon from '../assets/Icons-search@1x.png'

const SearchBar = (props) => {
    const { setQuery } = props;
    const [ input, setInput ] = useState('');

    const onSearchSubmit = (event) => {
        setQuery(input);
        event.preventDefault();
    };

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