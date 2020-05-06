import React, { useContext } from 'react';
import { ItemContext } from '../../context';

const CardHeader = () => {
    const item = useContext(ItemContext)
    let title = ""
    let info = ""
    const yearPattern = /\d{4}/;
    let date = ""

    switch(item.media_type) {
        case "person":
            let genders = ["Female", "Male"]
            title = item.name;
            info = `Gender: ${genders[item.gender - 1]}`;
            break;
        case "tv":
            date = item.first_air_date.replace("/");
            title = `${item.title} (${date.match(yearPattern)})`;
            info =`First air date: ${date}`;
            break;
        case "movie":
            date = item.release_date.replace("/");
            title = `${item.title} (${date.match(yearPattern)})`;
            info = `Release date: ${date}`
            break;
    }
    
    return (
        <div className="card-header-div">
            <h2>{title}</h2>
            <p><button>{item.media_type}</button>{info}</p>
        </div>
    )
}

export default CardHeader;