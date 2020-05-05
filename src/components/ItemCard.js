import React from 'react';
import noImageSrc from '../assets/images/no-image-available.jpg';

const ItemCard = (props) => {
    const { item, imageUrl } = props;
    const imageSrc = item.poster_path || item.profile_path ? `${imageUrl}${item.poster_path || item.profile_path}` : noImageSrc;
    
    return (
        <div id={item.id}>
            <div>
                <img src={imageSrc} alt={item.title}></img>
            </div>
            <div>
                <h2>{item.title || item.name}</h2>
                <p><button>{item.media_type}</button>{item.first_air_date || item.release_date}</p>
                <p>{item.overview}</p>
                <p>{item.vote_average}<button>{item.id}Check for trailer</button></p>
            </div>
        </div>
    )
}

export default ItemCard;