import { FilterCategory, allFilters } from "../App";

const FilterOptions = ({
    currentFilter,
    setFilter
}: {
    currentFilter: FilterCategory;
    setFilter: (newFilter: FilterCategory) => void;
}) => {
    // Pull the callback that sets the filter state off props

    // Create the event handler that targets the buttons name and calls setFilter with that value
    const onFilter = (newFilter: FilterCategory) => {
        setFilter(newFilter);
    };

    // The filter button needs to be split into a reusable component.
    return (
        <fieldset id="filter-options-div" role="group">
            <legend>Select a filter:</legend>
            {allFilters.map((filter) => (
                <div className="">
                    <input
                        type="radio"
                        id={filter}
                        name="drone"
                        value={filter}
                        checked={currentFilter === filter}
                        onChange={() => onFilter(filter)}
                    />
                    <label htmlFor={filter}>{filter}</label>
                </div>
            ))}
        </fieldset>
    );
};

export default FilterOptions;
