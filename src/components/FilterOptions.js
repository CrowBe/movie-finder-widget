import React from 'react';

const FilterOptions = (props) => {
    const { setFilter } = props;
    const onFilter = (event) => {
        setFilter(event.target.name);
    }
    return (
        <div id="filter-options-div">
            <button className="filter-button" name="all" onClick={onFilter} >All</button>
            <button className="filter-button" name="movie" onClick={onFilter} >Movies</button>
            <button className="filter-button" name="tv" onClick={onFilter} >TV Shows</button>
            <button className="filter-button" name="person" onClick={onFilter} >People</button>
        </div>
    )
}

export default FilterOptions;