import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    const [ collection, setCollection ] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;
    const results = collection.map((item) => <h3>{item.title}</h3>);

    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`);
            res.json()
                .then((data) => setCollection(data.results))
                .catch((error) => console.log(error));
        };

        fetchResults();
    })

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
