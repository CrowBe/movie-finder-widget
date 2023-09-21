import { useEffect } from "react";
import TrailerButton from "./TrailerButton";
import { isPersonResult } from "../../utils";

const CardFooter = ({ item }: { item: ResultItem }) => {
    // youtube Id setter to pass to the play button
    // Retrieve the item context with all the values of the current item
    // State that holds the value returned by the api call to the movie/:id/videos endpoint
    const rating = isPersonResult(item)
        ? item.popularity
        : item.vote_average * 10;
    // If the item is a movie, make an api call to the database checking if there are any trailers
    useEffect(() => {
        const ratingBar = document.getElementById(`${item.id}rating`);
        if (ratingBar) {
            ratingBar.style.setProperty("--rating-width", `${rating}%`);
            if (rating > 39 && rating <= 69) {
                ratingBar.style.setProperty("--rating-color", "#FFD43B");
            } else if (rating > 69) {
                ratingBar.style.setProperty("--rating-color", "#74B816");
            }
        }
    });

    // Return empty div if the current item is a person
    if (item.media_type === "person")
        return <div className="card-footer-div"></div>;

    return (
        <div className="card-footer-div" id={`${item.media_type}-${item.id}`}>
            <div className="card-ratings-div">
                {/* Format and return the user rating */}
                {item.vote_average > 0 ? (
                    <p>
                        User Score: <strong>{rating}%</strong>
                    </p>
                ) : (
                    <p>
                        User Score: <strong>Not Rated</strong>
                    </p>
                )}
                <div className="card-ratings-bar">
                    <div
                        className="card-ratings-color"
                        id={`${item.id}rating`}
                    ></div>
                </div>
            </div>
            <div>
                {/* Check if the item is a movie and return button that will set that id to play in the Trailer iframe */}
                <TrailerButton mediaType={item.media_type} id={item.id} />
            </div>
        </div>
    );
};

export default CardFooter;
