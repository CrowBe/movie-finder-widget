import { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context';
import tmdbClient from '../../api/tmdbClient';
import LinesEllipsis from 'react-lines-ellipsis';

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
    }, [text]);

    return (
        <LinesEllipsis
            className='card-text-div'
            text={text || "No Information Available."}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
        />
    )
}

export default CardText