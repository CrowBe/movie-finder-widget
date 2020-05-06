import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context';
import tmdbClient from '../../api/tmdbClient';

const CardFooter = (props) => {
    const { setYoutubeId } = props;
    const item = useContext(ItemContext);
    const [ trailerKey, setTrailerKey ] = useState('');
    const rating = item.vote_average * 10;

    const onPlayTrailer = (event) => {
        setYoutubeId(trailerKey);
    }

    useEffect(() => {
        if (item.media_type === "movie") {
            tmdbClient.get(`/movie/${item.id}/videos`)
                .then(response => {
                    for (let obj of response.data.results) {
                        if (obj.type === "Trailer" && obj.site === "YouTube") {
                            console.log(`${obj.name} ${obj.key}`)
                            setTrailerKey(obj.key);
                            break;
                        }
                    }
                })
                .catch(error => console.log(error));
        };
    }, []);


    if (item.media_type === "person") return <div className="card-footer-div"></div>;

    return (
        <div className="card-footer-div" id={item.id}>
            <div className="card-ratings-div">
                {item.vote_average > 0 ? <span>User Score: <em>{rating}%</em></span> : <span>User Score: <em>Not Rated</em></span>}
                <div className="card-ratings-bar"><div className="card-ratings-colour" style={{width: `${rating}%`}}></div></div>
            </div>
            <div>
                {item.media_type === "movie" ? <button onClick={onPlayTrailer} id={trailerKey} className="card-trailer-button">{trailerKey ? "Play Now" : "Trailer Unavailable"}</button> : null}
            </div>
        </div>
    )
}

export default CardFooter;