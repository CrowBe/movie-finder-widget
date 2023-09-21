import { ReactNode, useEffect, useState, Fragment } from "react";
import { mediaTypeDisplayNames, yearPattern } from "../../constants";

const CardHeader = ({ item }: { item: ResultItem }) => {
    const [data, setData] = useState<{
        title: ReactNode;
        info: string;
    }>();
    // Retrieve the current item context
    // Set up temporary values that will be modified depending on the media type.
    // This could be improved by splitting the components differently

    const setDataValues = (currentItem: ResultItem) => {
        let title = <Fragment></Fragment>;
        let info = "";
        let date = "";
        // Logic that checks the current media type to properly format the item information
        switch (currentItem.media_type) {
            case "person":
                let genders = ["Female", "Male"];
                title = <h3 id={`${currentItem.id}h3`}>{currentItem.name}</h3>;
                info = ` Gender: ${genders[currentItem.gender - 1]}`;
                break;
            case "tv":
                date = currentItem.first_air_date.replace(/-/g, "/");
                title = (
                    <h3 id={`${currentItem.id}h3`}>
                        {currentItem.name}
                        <strong>{` (${date.match(yearPattern)})`}</strong>
                    </h3>
                );
                info = ` First air date: ${date}`;
                break;
            case "movie":
                date = currentItem.release_date.replace(/-/g, "/");
                title = (
                    <h3 id={`${currentItem.id}h3`}>
                        {currentItem.title}
                        <strong>{` (${date.match(yearPattern)})`}</strong>
                    </h3>
                );
                info = ` Release date: ${date}`;
                break;
            default:
                break;
        }
        setData({ title, info });
    };

    useEffect(() => {
        setDataValues(item);
    }, [item]);
    // Improve styling to show an ellipsis when the title takes more than two lines.
    if (!data) return null;
    return (
        <div className="card-header-div">
            {data.title}
            <p>
                <button>{mediaTypeDisplayNames[item.media_type]}</button>
                {data.info}
            </p>
        </div>
    );
};

export default CardHeader;
