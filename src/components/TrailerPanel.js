import React from 'react';

const TrailerPanel = (props) => {
    const { youtubeId, setYoutubeId } = props
    if (!youtubeId) return null;

    const closeTrailer = (e) => {
        setYoutubeId('');
    }

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