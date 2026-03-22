import { useEffect, useRef, useState } from "react";
import "./App.scss";
import LogoHeader from "./components/LogoHeader";
import SearchBar from "./components/SearchBar";
import FilterOptions from "./components/FilterOptions";
import Results from "./components/Results";
import AIRecommendations from "./components/AIRecommendations";
import { getApiConfiguration, getTrending, searchByFilter } from "./services";
import { useConfigContext } from "./context";
import tmdbLogo from "./assets/tmdb_logo.svg";

function App() {
    const [results, setResults] = useState<ResultItem[] | undefined>();
    const [trendingResults, setTrendingResults] = useState<ResultItem[]>();
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    const [filter, setFilter] = useState<FilterCategory>("all");
    const [total, setTotal] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [aiOpen, setAiOpen] = useState(false);
    const { setImageUrl } = useConfigContext();

    // When true the next fetch will append results (mobile load-more).
    // Using a ref avoids it becoming a stale-closure issue in the effect.
    const appendRef = useRef(false);

    // Reset append mode whenever the query or filter changes so a fresh search
    // always replaces the result list instead of appending to it.
    useEffect(() => {
        appendRef.current = false;
    }, [query, filter]);

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

    // Fetch search results when query, filter, or page changes
    useEffect(() => {
        if (!query) {
            setResults(undefined);
            setTotal(undefined);
            setTotalPages(0);
            return;
        }
        const isAppend = appendRef.current;
        if (isAppend) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }
        searchByFilter(query, page, filter)
            .then((response) => {
                setTotal(response.total_results);
                setTotalPages(response.total_pages);
                if (isAppend) {
                    setResults((prev) => [
                        ...(prev ?? []),
                        ...response.results,
                    ]);
                } else {
                    setResults(response.results);
                }
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
                setLoadingMore(false);
            });
    }, [query, filter, page]);

    /** Filter change — resets to page 1 and replaces results. */
    const handleFilterChange = (newFilter: FilterCategory) => {
        appendRef.current = false;
        setFilter(newFilter);
        setPage(1);
    };

    /** Mobile infinite-scroll / load-more: appends the next page. */
    const handleLoadMore = () => {
        if (page < totalPages && !loadingMore && !loading) {
            appendRef.current = true;
            setPage((p) => p + 1);
        }
    };

    /** Desktop numbered pagination: replaces results and scrolls to top. */
    const handlePageChange = (newPage: number) => {
        appendRef.current = false;
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div id="app-container">
            <LogoHeader onAiClick={() => setAiOpen(true)} />
            <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
            <FilterOptions
                setFilter={handleFilterChange}
                currentFilter={filter}
            />
            <Results
                results={results ?? trendingResults}
                filter={filter}
                total={total ?? trendingResults?.length}
                totalPages={totalPages}
                page={page}
                loading={loading}
                loadingMore={loadingMore}
                query={query}
                onLoadMore={handleLoadMore}
                onPageChange={handlePageChange}
            />
            {aiOpen && (
                <AIRecommendations
                    onClose={() => setAiOpen(false)}
                    searchContext={query}
                />
            )}
            <footer className="app-footer">
                <img src={tmdbLogo} alt="TMDB" className="footer-tmdb-logo" />
                <span>
                    This product uses the TMDB API but is not endorsed or
                    certified by{" "}
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        TMDb
                    </a>
                    . Data and images subject to their{" "}
                    <a
                        href="https://www.themoviedb.org/documentation/api/terms-of-use"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        terms of use
                    </a>
                    .
                </span>
            </footer>
        </div>
    );
}

export default App;
