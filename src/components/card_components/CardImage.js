import React, {useContext} from 'react';
import { ConfigContext, ItemContext } from '../../context';
import noImageSrc from '../../assets/no-image-available.jpg';

const ImageCard = () => {
    // Check the dynamically updated base image url
    const imageUrl = useContext(ConfigContext);
    // Retrieve the current item
    const item = useContext(ItemContext);
    // Set the base image to be a no image placeholder
    let imageSrc = noImageSrc;
    let alt = "no image available";

    // logic that checks if the current item has an image path and update the src if it does
    if (item.media_type === "person" && item.profile_path) {
        imageSrc = `${imageUrl}${item.profile_path}`;
        alt = item.name;
    } else if (item.poster_path) {
        imageSrc = `${imageUrl}${item.poster_path}`;
        alt = item.title;
    };

    return (
        <div className="card-image-div">
            <img src={imageSrc} alt={alt} />
        </div>
    )
}

export default ImageCard