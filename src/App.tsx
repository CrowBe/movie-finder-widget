import { useEffect, useState } from "react";
import "./App.scss";
import LogoHeader from "./components/LogoHeader";
import SearchBar from "./components/SearchBar";
import FilterOptions from "./components/FilterOptions";
import Results from "./components/Results";
import AIRecommendations from "./components/AIRecommendations";
import { getApiConfiguration, getTrending, searchMulti } from "./services";
import { useConfigContext } from "./context";

function App() {
    const [results, setResults] = useState<ResultItem[]>();
    const [trendingResults, setTrendingResults] = useState<ResultItem[]>();
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const [filter, setFilter] = useState<FilterCategory>("all");
    const [total, setTotal] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [aiOpen, setAiOpen] = useState(false);
    const { setImageUrl } = useConfigContext();

    // Fetch trending + API config on mount
    useEffect(() => {
        setLoading(true);
        Promise.all([getTrending(), getApiConfiguration()])
            .then(([trending, config]) => {
                setTrendingResults(trending.results);
                setImageUrl(`${config.images.secure_base_url}w185`);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [setImageUrl]);

    // Fetch search results when query or page changes
    useEffect(() => {
        if (!query) {
            setResults(undefined);
            return;
        }
        setLoading(true);
        searchMulti(query, page)
            .then((response) => {
                setTotal(response.total_results);
                setResults(response.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [query, page]);

    return (
        <div id="app-container">
            <LogoHeader onAiClick={() => setAiOpen(true)} />
            <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
            <FilterOptions setFilter={setFilter} currentFilter={filter} />
            <Results
                results={results ?? trendingResults}
                filter={filter}
                total={total ?? trendingResults?.length}
                loading={loading}
                query={query}
            />
            {aiOpen && (
                <AIRecommendations
                    onClose={() => setAiOpen(false)}
                    searchContext={query}
                />
            )}
        </div>
    );
}

export default App;
