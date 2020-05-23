import React, { useEffect, useState } from 'react';
import tmdbClient from './api/tmdbClient';
import Results from './components/Results';
import LogoHeader from './components/LogoHeader';
import AttributionHeader from './components/AttributionHeader';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import './App.css';


const App = () => {
    // State to hold the results of the current api data request
    const [ results, setResults ] = useState([]);
    // Store the current page/s displayed to implement infinite scrolling/pagination
    const [ page, setPage ] = useState(1);
    // Store the user's query on search submit to pass into a fetch request.
    const [ query, setQuery ] = useState("");
    // Control the input state of the search bar until user submission
    const [ filter, setFilter ] = useState("all");
    // Store the number of results returned
    const [ total, setTotal ] = useState(20);

    // TODO: Set up Intersection Observer to identify when the user is reaching the end
    // of the current page of results and trigger another api call to update results state.

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
                    setTotal(response.data.total_results);
                    if ( page === 1) {
                        setResults(response.data.results);
                    } else {
                        setResults(...results, response.data.results);
                    }
                })
                .catch(err => console.log(err));
        }
        // The dependencies below trigger a warning, but following the suggestion causes
        // looping. See https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871
    }, [page, query, filter]);

    return (
        <div className="app">
            <header>
                <LogoHeader />
                <AttributionHeader />
                <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
                <FilterOptions setFilter={setFilter} />
            </header>
            {/* Pass the current collection to each component.*/}
            <Results results={results} filter={filter} total={total} />
        </div>
    );
}

export default App;