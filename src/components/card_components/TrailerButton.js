import React from 'react';

const TrailerButton = (props) => {
    const { available, setYoutubeId } = props;
    const onPlayTrailer = (event) => {
        setYoutubeId(available);
    }

    if (!available) {
        return <button className="no-trailer-button"><span className="clipped-play-symbol"></span>Trailer Unavailable</button>
    }
    return <button onClick={onPlayTrailer} id={available} className="card-trailer-button"><span className="clipped-play-symbol"></span>Play Trailer</button>
};

export default TrailerButton;