import { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { getPersonDetails } from "../../services";

const CardText = ({ item }: { item: ResultItem }) => {
    const [text, setText] = useState<string>();

    useEffect(() => {
        // Retrieve biography information for the person media type
        if (item.media_type === "person") {
            getPersonDetails(item.id)
                .then((response) => setText(response.biography))
                .catch((error) => console.log(error));
        } else {
            setText(item.overview);
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
