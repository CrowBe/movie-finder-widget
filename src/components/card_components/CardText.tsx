import { useEffect, useState } from "react";
import { getPersonDetails } from "../../services";

const CardText = ({ item }: { item: ResultItem }) => {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        if (item.media_type === "person") {
            getPersonDetails(item.id)
                .then((r) => setText(r.biography))
                .catch(() => setText(""));
        } else {
            setText(item.overview);
        }
    }, [item]);

    return (
        <p className="card-text-div">
            {text || "No information available."}
        </p>
    );
};

export default CardText;
