const FilterOptions = (props) => {
    // Pull the callback that sets the filter state off props
    const { setFilter } = props;

    // Create the event handler that targets the buttons name and calls setFilter with that value
    const onFilter = (event) => {
        setFilter(event.target.name);
    };

    // The filter button needs to be split into a reusable component.
    return (
        <div id="filter-options-div">
            <button className="filter-button" name="all" onClick={onFilter}>All</button>
            <button className="filter-button" name="movie" onClick={onFilter}>Movies</button>
            <button className="filter-button" name="tv" onClick={onFilter}>TV Shows</button>
            <button className="filter-button" name="person" onClick={onFilter}>People</button>
        </div>
    )
}

export default FilterOptions;