import { allFilters, mediaTypeDisplayNames } from "../constants";

const FilterOptions = ({
    currentFilter,
    setFilter,
}: {
    currentFilter: FilterCategory;
    setFilter: (newFilter: FilterCategory) => void;
}) => (
    <div className="filters-section" role="group" aria-label="Filter by media type">
        <span className="filter-label">Filter:</span>
        {allFilters.map((filter) => (
            <button
                key={filter}
                className={`filter-pill${currentFilter === filter ? " active" : ""}`}
                onClick={() => setFilter(filter)}
                aria-pressed={currentFilter === filter}
            >
                {mediaTypeDisplayNames[filter]}
            </button>
        ))}
    </div>
);

export default FilterOptions;
