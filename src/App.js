import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [ collection, setCollection ] = useState([]);
    const [ imageConfig, setImageConfig ] = useState({});
    const apiKey = process.env.REACT_APP_API_KEY;

    const results = collection.map((item) => {
        return(
            <div key={item.id}>
                <div>
                    <img src={`${imageConfig.secure_base_url}w185${item.poster_path}`}></img>
                </div>
                <h3>{item.title || item.name}</h3>
                <p>{item.media_type} {item.release_date || item.first_air_date}</p>
                <p>{item.overview}</p>
                <p>{item.vote_average}</p>
            </div>
        )
    });
    const getConfig = async () => {
        fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
            .then(res => res.json())
            .then(response => setImageConfig(response.images))
            .catch(error => console.log(error));
    };

    const getInitialCollection = async () => {
        fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
            .then(res => res.json())
            .then(response => setCollection(response.results))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getConfig();
        getInitialCollection();
    }, []);

    return (
        <div className="App">
            <header>
                {/* {Set up search bar} */}
            </header>
            {/* Create a component and map the collection to each component.*/}
            <div>{results}</div>
        </div>
    );
}

export default App;
