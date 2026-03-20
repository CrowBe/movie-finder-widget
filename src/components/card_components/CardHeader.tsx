import { mediaTypeDisplayNames, yearPattern } from "../../constants";

const getTitle = (item: ResultItem): string => {
    if (item.media_type === "person") return item.name;
    if (item.media_type === "tv") return item.name;
    return item.title;
};

const getDate = (item: ResultItem): string | null => {
    if (item.media_type === "movie") return item.release_date ?? null;
    if (item.media_type === "tv") return item.first_air_date ?? null;
    return null;
};

const getMetaInfo = (item: ResultItem): string => {
    if (item.media_type === "person") {
        const genders = ["", "Female", "Male", "Non-binary"];
        return genders[item.gender] ?? "Unknown gender";
    }
    const date = getDate(item);
    const label = item.media_type === "tv" ? "First aired" : "Released";
    return date ? `${label}: ${date.replace(/-/g, "/")}` : "";
};

const CardHeader = ({ item }: { item: ResultItem }) => {
    const title = getTitle(item);
    const date = getDate(item);
    const year = date ? date.match(yearPattern)?.[0] : null;
    const meta = getMetaInfo(item);

    return (
        <div className="card-header-div">
            <h3 className="card-title">
                {title}
                {year && <span className="year"> ({year})</span>}
            </h3>
            <div className="card-meta">
                <span className="media-badge">
                    {mediaTypeDisplayNames[item.media_type]}
                </span>
                {meta && <span>{meta}</span>}
            </div>
        </div>
    );
};

export default CardHeader;
