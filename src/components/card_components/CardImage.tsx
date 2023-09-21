import { useEffect, useState } from "react";
import noImageSrc from "../../assets/no-image-available.jpg";
import { useConfigContext } from "../../context";
import { isPersonResult, isTVResult } from "../../utils";

const ImageCard = ({ item }: { item: ResultItem }) => {
    // Check the dynamically updated base image url
    const { imageUrl } = useConfigContext();
    const [imageSrc, setImageSrc] = useState<string>(noImageSrc);
    const [alt, setAlt] = useState<string>("no image available");
    // Retrieve the current item
    // Set the base image to be a no image placeholder

    // logic that checks if the current item has an image path and update the src if it does
    useEffect(() => {
        if (imageUrl.length > 0) {
            if (isPersonResult(item)) {
                setImageSrc(`${imageUrl}${item.profile_path}`);
                setAlt(item.name);
            } else if (item.poster_path) {
                setImageSrc(`${imageUrl}${item.poster_path}`);
                setAlt(isTVResult(item) ? item.name : item.title);
            }
        }
    }, [item, imageUrl]);
    return (
        <div className="card-image-div">
            <img src={imageSrc} alt={alt} />
        </div>
    );
};

export default ImageCard;
