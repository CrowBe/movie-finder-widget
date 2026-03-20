import { useConfigContext } from "../../context";
import { getResultVideos } from "../../services";
import { mediaTypeDisplayNames } from "../../constants";

const PlayIcon = () => <span className="play-icon" aria-hidden="true" />;

const TrailerButton = ({
    mediaType,
    id,
}: {
    mediaType: "person" | "tv" | "movie";
    id: number;
}) => {
    const { setYoutubeId } = useConfigContext();

    const onPlay = (type: "tv" | "movie") => {
        getResultVideos(type, id)
            .then((response) => {
                const key = response.results.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                )?.key;
                if (key) {
                    setYoutubeId(key);
                } else {
                    alert(`No trailer found for this ${mediaTypeDisplayNames[type]}`);
                }
            })
            .catch(console.error);
    };

    if (mediaType === "person") {
        return (
            <button className="no-trailer-button" disabled aria-label="Trailer unavailable">
                <PlayIcon /> Unavailable
            </button>
        );
    }

    return (
        <button
            className="card-trailer-button"
            onClick={() => onPlay(mediaType)}
            aria-label={`Play trailer for this ${mediaTypeDisplayNames[mediaType]}`}
        >
            <PlayIcon /> Trailer
        </button>
    );
};

export default TrailerButton;
