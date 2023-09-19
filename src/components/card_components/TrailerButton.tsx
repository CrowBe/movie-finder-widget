import React from 'react';

const TrailerButton = (props) => {
    // Component will render if the current Item is a movie
    const { available, setYoutubeId } = props;
    
    // Passing the youtube trailer id back up the chain
    const onPlayTrailer = (event) => {
        setYoutubeId(available);
    }

    // Returns a different button that is formatted differently and doesn't have access to the state setter
    if (!available) {
        return <button className="no-trailer-button"><span className="clipped-play-symbol"></span>Trailer Unavailable</button>
    }
    // Button with access to the Item's trailer id and the state setter
    return <button onClick={onPlayTrailer} id={available} className="card-trailer-button"><span className="clipped-play-symbol"></span>Play Trailer</button>
};

export default TrailerButton;