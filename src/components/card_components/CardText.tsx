import { useEffect, useState } from "react";
import tmdbClient from "../../api/tmdbClient";
import LinesEllipsis from "react-lines-ellipsis";
import { ResultItem } from "../../App";

const CardText = ({ item }: { item: ResultItem }) => {
    const [text, setText] = useState<string>(item.overview);

    useEffect(() => {
        // Retrieve biography information for the person media type
        if (item.media_type === "person") {
            tmdbClient
                .get(`/person/${item.id}`)
                .then((response) => setText(response.data.biography))
                .catch((error) => console.log(error));
        }
    }, [item]);

    return (
        <LinesEllipsis
            className="card-text-div"
            text={text || "No Information Available."}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
        />
    );
};

export default CardText;
