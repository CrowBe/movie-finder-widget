import React from 'react';

const TrailerPanel = (props) => {
    // Receives an current youtube Id state and setter
    const { youtubeId, setYoutubeId } = props
    // Returns null if there isn't currently a trailer played
    if (!youtubeId) return null;

    // Callback function to reset the current id to a falsy, closing this component
    const closeTrailer = (e) => {
        setYoutubeId('');
    }

    // modal panel that displays a youtube iframe
    return (
        <div id="modal-trailer-panel">
            <div>
                <button onClick={closeTrailer}>X</button>
                <iframe title={youtubeId} width="560" height="315"
                src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1frameborder="0" 
                allowfullscreen`}></iframe>
            </div>
        </div>
    )
}

export default TrailerPanel;