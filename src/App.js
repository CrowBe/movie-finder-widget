import React, { useEffect, useState } from 'react';
import tmdbClient from './api/tmdbClient';
import Results from './components/Results';
import './App.css';

const App = () => {
    // State to hold the results of the current api data request
    const [ results, setResults ] = useState([]);
    // Store the current page/s displayed to implement infinite scrolling/pagination
    const [ page, setPage ] = useState(1);
    // Store the user's query on search submit to pass into a fetch request.
    const [ query, setQuery ] = useState('');
    // Control the input state of the search bar until user submission
    const [ input, setInput ] = useState('');

    useEffect(() => {
        if (!query){
            tmdbClient.get('/trending/all/week')
                .then(response => {
                    setResults(response.data.results);
                })
                .catch(err => console.log(err));
        } else {
            tmdbClient.get(`/search/multi?language=en-US&query=${query}&page=${page}&include_adult=false`)
                .then(response => {
                    setResults(response.data.results);
                })
                .catch(err => console.log(err));
        }
    }, [page, query]);

    const onSearchSubmit = (event) => {
        setQuery(input);
        event.preventDefault();
    };

    return (
        <div className="App">
            <header>
                <div>
                    <form id="search-bar" onSubmit={onSearchSubmit}>
                        <label htmlFor="input">Search</label>
                        <input type="text" id="input" name="input" value={input} onChange={event => setInput(event.target.value)}/>
                        <input type="submit" value="Search" form="search-bar" />
                    </form>
                </div>
            </header>
            {/* Pass the current collection to each component.*/}
            <Results results={results} />
        </div>
    );
}

export default App;
