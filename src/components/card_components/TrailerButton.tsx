import React from "react";
import { useConfigContext } from "../../context";
import { getResultVideos } from "../../services";
import { mediaTypeDisplayNames } from "../../constants";

const TrailerButton = ({ mediaType, id }: { mediaType: 'person' | 'tv' | 'movie', id: number }) => {
    // Component will render if the current Item is a movie
    const { setYoutubeId } = useConfigContext();

    // Passing the youtube trailer id back up the chain
    const onPlayTrailer = (type: 'tv' | 'movie') => {
            getResultVideos(type, id)
                .then((response) => {
                    let trailerKey = response.results.find(
                        ({ type, site }) =>
                            type === "Trailer" && site === "YouTube"
                    )?.key
                    if (trailerKey) {
                        setYoutubeId(trailerKey
                            );
                    } else {
                        alert(`No Trailer found for this ${mediaTypeDisplayNames[mediaType]}`)
                    }
                })
                .catch((error) => console.log(error));
    };

    // Returns a different button that is formatted differently and doesn't have access to the state setter
    if (mediaType === 'person') {
        return (
            <button className="no-trailer-button">
                <span className="clipped-play-symbol"></span>Trailer Unavailable
            </button>
        );
    }
    // Button with access to the Item's trailer id and the state setter
    return (
        <button
            onClick={() => onPlayTrailer(mediaType)}
            id={`${mediaType}-${id}`}
            className="card-trailer-button"
        >
            <span className="clipped-play-symbol"></span>Play Trailer
        </button>
    );
};

export default TrailerButton;
