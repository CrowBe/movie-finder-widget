import { useEffect, useRef } from "react";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import TrailerPanel from "./TrailerPanel";

const SkeletonCard = () => (
    <div className="skeleton-card" aria-hidden="true">
        <div className="skeleton-image" />
        <div className="skeleton-content">
            <div className="skeleton-line w-70" />
            <div className="skeleton-line w-40" />
            <div className="skeleton-line w-90" />
            <div className="skeleton-line w-80" />
            <div className="skeleton-line w-60" />
        </div>
    </div>
);

const Results = ({
    results,
    filter,
    total,
    totalPages,
    page,
    loading,
    loadingMore,
    query,
    onLoadMore,
    onPageChange,
}: {
    results?: ResultItem[];
    filter: FilterCategory;
    total?: number;
    totalPages: number;
    page: number;
    loading?: boolean;
    loadingMore?: boolean;
    query: string;
    onLoadMore: () => void;
    onPageChange: (page: number) => void;
}) => {
    // Server-side filtering is used for non-"all" filters, but keep as a
    // safety guard in case any mixed results slip through on the "all" endpoint.
    const filtered = results?.filter(
        (item) => filter === "all" || item.media_type === filter
    );
    const displayCount = filtered?.length ?? 0;
    const hasMore = page < totalPages;

    // IntersectionObserver sentinel for mobile infinite scroll
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasMore || loadingMore || loading || !query) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            },
            // Only auto-trigger on mobile via rootMargin; desktop uses click pagination
            { rootMargin: "300px" }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, loadingMore, loading, query, onLoadMore]);

    return (
        <section id="results-container">
            <div className="results-header">
                {loading ? (
                    <span className="results-count">Loading…</span>
                ) : (
                    <>
                        <span className="results-label">
                            {query ? "Search results" : "Trending this week"}
                        </span>
                        <span className="results-count">
                            {total !== undefined &&
                                `${displayCount.toLocaleString()} of ${total.toLocaleString()} results`}
                        </span>
                    </>
                )}
            </div>

            {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonCard key={i} />
                  ))
                : filtered?.map((item) => (
                      <ItemCard key={`${item.media_type}-${item.id}`} item={item} />
                  ))}

            {/* ── Mobile: infinite scroll sentinel + load-more fallback ── */}
            {query && !loading && (
                <div className="load-more-container">
                    {/* Sentinel triggers IntersectionObserver */}
                    <div ref={sentinelRef} className="infinite-scroll-sentinel" />

                    {hasMore ? (
                        <button
                            className="load-more-btn"
                            onClick={onLoadMore}
                            disabled={loadingMore}
                            aria-label="Load more results"
                        >
                            {loadingMore ? "Loading…" : "Load more"}
                        </button>
                    ) : (
                        filtered && filtered.length > 0 && (
                            <span className="load-more-info">All results loaded</span>
                        )
                    )}
                </div>
            )}

            {/* ── Desktop: numbered pagination ── */}
            {query && !loading && totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}

            <TrailerPanel />
        </section>
    );
};

export default Results;
