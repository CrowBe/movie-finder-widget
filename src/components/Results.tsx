import ItemCard from "./ItemCard";
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
    loading,
    query,
}: {
    results?: ResultItem[];
    filter: FilterCategory;
    total?: number;
    loading?: boolean;
    query: string;
}) => {
    const filtered = results?.filter(
        (item) => filter === "all" || item.media_type === filter
    );
    const displayCount = filtered?.length ?? 0;

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

            <TrailerPanel />
        </section>
    );
};

export default Results;
