import { useEffect, useState } from "react";
import "./App.css";
import LogoHeader from "./components/LogoHeader";
import AttributionHeader from "./components/AttributionHeader";
import SearchBar from "./components/SearchBar";
import FilterOptions from "./components/FilterOptions";
import Results from "./components/Results";
import { getApiConfiguration, getTrending, searchMulti } from "./services";
import { useConfigContext } from "./context";

function App() {
    // State to hold the results of the current api data request
    const [results, setResults] = useState<ResultItem[]>();
    const [trendingResults, setTrendingResults] = useState<ResultItem[]>();
    // Store the current page/s displayed to implement infinite scrolling/pagination
    const [page, setPage] = useState<number>(1);
    // Store the user's query on search submit to pass into a fetch request.
    const [query, setQuery] = useState<string>("");
    // Control the input state of the search bar until user submission
    const [filter, setFilter] = useState<FilterCategory>("all");
    // Store the number of results returned
    const [total, setTotal] = useState<number>();
    const [totalTrending, setTotalTrending] = useState<number>();
    const { setImageUrl } = useConfigContext();

    useEffect(() => {
        if (query) {
            searchMulti(query, page)
                .then((response) => {
                    setTotal(response.total_results);
                    setResults(response.results);
                })
                .catch((err) => console.log(err));
        }
        // The dependencies below trigger a warning, but following the suggestion causes
        // looping. See https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871
    }, [page, query]);

    useEffect(() => {
        getTrending()
            .then((response) => {
                setTrendingResults(response.results);
                setTotalTrending(response.results.length);
                getApiConfiguration()
                    .then((response) => {
                        setImageUrl(`${response.images.secure_base_url}w185`);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div id="app-container">
            <LogoHeader />
            <AttributionHeader />
            <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
            <FilterOptions setFilter={setFilter} currentFilter={filter} />
            {/* Pass the current collection to each component.*/}
            <Results
                results={results || trendingResults}
                filter={filter}
                total={total || totalTrending}
            />
        </div>
    );
}

export default App;
