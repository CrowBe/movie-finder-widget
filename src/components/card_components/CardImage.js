import React, {useContext} from 'react';
import { ConfigContext, ItemContext } from '../../context';
import noImageSrc from '../../assets/no-image-available.jpg';

const ImageCard = () => {
    const imageUrl = useContext(ConfigContext);
    const item = useContext(ItemContext);
    let imageSrc = noImageSrc;
    let alt = "no image available";

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