import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context';
import tmdbClient from '../../api/tmdbClient';
import { Ellipsis } from 'ftellipsis';

const CardText = () => {
    const item = useContext(ItemContext);
    const [ text, setText] = useState(item.overview);

    useEffect(() => {
        // Retrieve biography information for the person media type
        if (item.media_type === "person") {
            tmdbClient.get(`/person/${item.id}`)
                .then(response => setText(response.data.biography))
                .catch(error => console.log(error));
        };
        // npm package from https://github.com/ftlabs/ftellipsis that works with css to
        // cut off the text at the end of the container and place an ellipsis.
        const element = document.getElementById(`${item.id}text`);
        const ellipsis = new Ellipsis(element.firstChild);
        // Works out the target height
        ellipsis.calc();
        // Cuts off the text and sets an ellipsis in the correct location dynamically
        ellipsis.set();
                // The dependencies below trigger a warning, but following the suggestion causes
        // looping. See https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871
    }, [text]);

    return (
        <div className="card-text-div" id={`${item.id}text`} >
            <div>
                <p>{text || "No Information Available."}</p>
            </div>
        </div>
    )
}

export default CardText