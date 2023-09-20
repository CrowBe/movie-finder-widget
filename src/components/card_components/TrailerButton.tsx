import React from "react";
import { useConfigContext } from "../../context";

const TrailerButton = ({ trailerKey }: { trailerKey?: string }) => {
    // Component will render if the current Item is a movie
    const { setYoutubeId } = useConfigContext();

    // Passing the youtube trailer id back up the chain
    const onPlayTrailer = () => {
        if (trailerKey) setYoutubeId(trailerKey);
    };

    // Returns a different button that is formatted differently and doesn't have access to the state setter
    if (!trailerKey) {
        return (
            <button className="no-trailer-button">
                <span className="clipped-play-symbol"></span>Trailer Unavailable
            </button>
        );
    }
    // Button with access to the Item's trailer id and the state setter
    return (
        <button
            onClick={onPlayTrailer}
            id={trailerKey}
            className="card-trailer-button"
        >
            <span className="clipped-play-symbol"></span>Play Trailer
        </button>
    );
};

export default TrailerButton;
