import { useEffect, useState } from "react";
import noImageSrc from "../../assets/no-image-available.jpg";
import { useConfigContext } from "../../context";
import { isPersonResult, isTVResult } from "../../utils";

const CardImage = ({ item }: { item: ResultItem }) => {
    const { imageUrl } = useConfigContext();
    const [src, setSrc] = useState(noImageSrc);
    const [alt, setAlt] = useState("No image available");

    useEffect(() => {
        if (!imageUrl) return;

        if (isPersonResult(item) && item.profile_path) {
            setSrc(`${imageUrl}${item.profile_path}`);
            setAlt(item.name);
        } else if (!isPersonResult(item) && item.poster_path) {
            setSrc(`${imageUrl}${item.poster_path}`);
            setAlt(isTVResult(item) ? item.name : item.title);
        }
    }, [item, imageUrl]);

    return (
        <div className="card-image-div">
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={() => setSrc(noImageSrc)}
            />
        </div>
    );
};

export default CardImage;
