import { useEffect, useRef } from "react";
import TrailerButton from "./TrailerButton";
import { isPersonResult } from "../../utils";

const CardFooter = ({ item }: { item: ResultItem }) => {
    const barRef = useRef<HTMLDivElement>(null);
    const rating = isPersonResult(item) ? null : item.vote_average * 10;

    useEffect(() => {
        const bar = barRef.current;
        if (!bar || rating === null) return;
        bar.style.setProperty("--rating-width", `${rating}%`);
        const color =
            rating > 69 ? "#22c55e" : rating > 39 ? "#f59e0b" : "#ef4444";
        bar.style.setProperty("--rating-color", color);
    }, [rating]);

    if (item.media_type === "person") {
        return <div className="card-footer-div" />;
    }

    return (
        <div className="card-footer-div">
            <div className="card-ratings-div">
                <span className="rating-score">
                    {item.vote_average > 0 ? (
                        <>
                            Score <strong>{Math.round(rating!)}%</strong>
                        </>
                    ) : (
                        <strong>Not rated</strong>
                    )}
                </span>
                {item.vote_average > 0 && (
                    <div className="card-ratings-bar" ref={barRef}>
                        <div className="card-ratings-color" />
                    </div>
                )}
            </div>
            <TrailerButton mediaType={item.media_type} id={item.id} />
        </div>
    );
};

export default CardFooter;
