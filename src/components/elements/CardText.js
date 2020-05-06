import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context';
import tmdbClient from '../../api/tmdbClient';

const CardText = () => {
    const item = useContext(ItemContext);
    const [ text, setText] = useState(item.overview);

    useEffect(() => {
        if (item.media_type === "person") {
            tmdbClient.get(`/person/${item.id}`)
                .then(response => setText(response.data.biography))
                .catch(error => console.log(error));
        };
    }, [text]);

    return (
        <div className="card-text-div">
            <p>{text || "No Information Available."}</p>
        </div>
    )
}

export default CardText