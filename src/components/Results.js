import React, { useState, useEffect } from 'react';
import tmdbClient from '../api/tmdbClient';
import { ConfigContext, ItemContext } from '../context';
import ItemCard from './ItemCard';
import TrailerPanel from './TrailerPanel';


const Results = (props) => {
    const { results, filter, total } = props;
    // Store the base image url from a config api call and pass into context
    // that will be made available to every item card by a react context provider
    const [ imageUrl, setImageUrl ] = useState('');
    // Store the value retrieved set by the play trailer button most recently pressed
    const [ youtubeId , setYoutubeId ] = useState('');

    useEffect(() => {
        tmdbClient.get('/configuration')
            .then(response => {
                setImageUrl(`${response.data.images.secure_base_url}w185`)
            })
            .catch(err => console.log(err));

    }, [filter]);


    return (
        <section id="results-container">
            {/* Display the total number of results - needs to be updated for filtering */}
            <p id="count-description">{total !== 1 ? `${total} results found` : `${total} result found`}</p>
            {/* React context provider that can be accessed in the tree with use context */}
            <ConfigContext.Provider value={imageUrl}>
                {filter !== "all" ? results.filter(item => item.media_type === filter).map(item => {
                    return (
                        <ItemContext.Provider value={item} key={item.id}>
                            <ItemCard setYoutubeId={setYoutubeId}/>
                        </ItemContext.Provider>
                    )
                }) : results.map(item => {
                    return (
                        <ItemContext.Provider value={item} key={item.id}>
                            <ItemCard setYoutubeId={setYoutubeId}/>
                        </ItemContext.Provider>
                    )
                })}
            </ConfigContext.Provider>
            {/* This container will be target by Intersection Observer for pagination effects */}
            <div id="observer-div"></div>
            {/* Modal Panel component that returns null until a youtube id is present */}
            <TrailerPanel youtubeId={youtubeId} setYoutubeId={setYoutubeId} />
        </section>
    );
};

export default Results;