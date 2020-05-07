import React, { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context';
import tmdbClient from '../../api/tmdbClient';
import TrailerButton from './TrailerButton';

const CardFooter = (props) => {
    // youtube Id setter to pass to the play button
    const { setYoutubeId } = props;
    // Retrieve the item context with all the values of the current item
    const item = useContext(ItemContext);
    // State that holds the value returned by the api call to the movie/:id/videos endpoint
    const [ trailerKey, setTrailerKey ] = useState('');
    const rating = item.vote_average * 10;

    // If the item is a movie, make an api call to the database checking if there are any trailers
    useEffect(() => {
        if (item.media_type === "movie") {
            tmdbClient.get(`/movie/${item.id}/videos`)
                .then(response => {
                    for (let obj of response.data.results) {
                        if (obj.type === "Trailer" && obj.site === "YouTube") {
                            setTrailerKey(obj.key);
                            break;
                        }
                    }
                })
                .catch(error => console.log(error));
            
        };
    }, []);

    // Return empty div if the current item is a person
    if (item.media_type === "person") return <div className="card-footer-div"></div>;

    
    return (
        <div className="card-footer-div" id={item.id}>
            <div className="card-ratings-div">
                {/* Format and return the user rating */}
                {item.vote_average > 0 ? <p>User Score: <strong>{rating}%</strong></p> : <p>User Score: <strong>Not Rated</strong></p>}
                <div className="card-ratings-bar"><div className="card-ratings-colour" style={{width: `${rating}%`}}></div></div>
            </div>
            <div>
                {/* Check if the item is a movie and return button that will set that id to play in the Trailer iframe */}
                {item.media_type === "movie" ? <TrailerButton setYoutubeId={setYoutubeId} available={trailerKey} /> : null}
            </div>
        </div>
    )
}

export default CardFooter;