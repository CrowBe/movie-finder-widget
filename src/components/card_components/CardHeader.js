import React, { useContext } from 'react';
import { ItemContext } from '../../context';

const CardHeader = () => {
    const item = useContext(ItemContext)
    let title = ""
    let info = ""
    const yearPattern = /\d{4}/;
    let date = ""
    let type = ""

    switch(item.media_type) {
        case "person":
            let genders = ["Female", "Male"]
            title = <h3>{item.name}</h3>;
            type = "People"
            info = ` Gender: ${genders[item.gender - 1]}`;
            break;
        case "tv":
            type = "TV Show"
            date = item.first_air_date.replace(/-/g, "/");
            title = <h3>{item.name}<strong>{` (${date.match(yearPattern)})`}</strong></h3>;
            info =` First air date: ${date}`;
            break;
        case "movie":
            type = "Movie"
            date = item.release_date.replace(/-/g, "/");
            title = <h3>{item.title}<strong>{` (${date.match(yearPattern)})`}</strong></h3>;
            info = ` Release date: ${date}`
            break;
        default:
            break;
    }
    
    return (
        <div className="card-header-div">
            {title}
            <p><button>{type}</button>{info}</p>
        </div>
    )
}

export default CardHeader;