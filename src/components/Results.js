import React, { useState, useEffect } from 'react';
import tmdbClient from '../api/tmdbClient';
import { ConfigContext, ItemContext } from '../context';
import ItemCard from './ItemCard';
import TrailerPanel from './elements/TrailerPanel';


const Results = (props) => {
    const { results } = props;
    const [ imageUrl, setImageUrl ] = useState('');
    const [ youtubeId , setYoutubeId ] = useState('');

    useEffect(() => {
        tmdbClient.get('/configuration')
            .then(response => {
                setImageUrl(`${response.data.images.secure_base_url}w185`)
            })
            .catch(err => console.log(err));
    });


    return (
        <section id="results-container">
            <ConfigContext.Provider value={imageUrl}>
                {results.map((item) => {
                    return (
                        <ItemContext.Provider value={item} key={item.id}>
                            <ItemCard key={item.id} setYoutubeId={setYoutubeId}/>
                        </ItemContext.Provider>
                    )
                })}
            </ConfigContext.Provider>
            <TrailerPanel youtubeId={youtubeId} setYoutubeId={setYoutubeId} />
        </section>
    );
};

export default Results;