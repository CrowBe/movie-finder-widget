import { useEffect } from "react";
import tmdbClient from "../api/tmdbClient";
import { ConfigContextProvider, useConfigContext } from "../context";
import ItemCard from "./ItemCard";
import TrailerPanel from "./TrailerPanel";
import { FilterCategory, ResultItem } from "../App";

const Results = ({
    results,
    filter,
    total
}: {
    results: ResultItem[];
    filter: FilterCategory;
    total?: number;
}) => {
    // Store the base image url from a config api call and pass into context
    // that will be made available to every item card by a react context provider
    // Store the value retrieved set by the play trailer button most recently pressed
    const { setImageUrl } = useConfigContext();
    useEffect(() => {
        tmdbClient
            .get("/configuration")
            .then((response) => {
                setImageUrl(`${response.data.images.secure_base_url}w185`);
            })
            .catch((err) => console.log(err));
    }, [filter]);

    return (
        <section id="results-container">
            {/* Display the total number of results - needs to be updated for filtering */}
            <p id="count-description">
                {total !== 1
                    ? `${total} results found`
                    : `${total} result found`}
            </p>
            {/* React context provider that can be accessed in the tree with use context */}
            <ConfigContextProvider>
                {results.map((item) => {
                    if (filter !== "all" && item.media_type !== filter)
                        return null;
                    return <ItemCard item={item} />;
                })}
            </ConfigContextProvider>
            {/* This container will be target by Intersection Observer for pagination effects */}
            <div id="observer-div"></div>
            {/* Modal Panel component that returns null until a youtube id is present */}
            <TrailerPanel />
        </section>
    );
};

export default Results;
