import React, { useState, useEffect } from 'react';
import tmdbClient from '../api/tmdbClient';
import { ConfigContext, ItemContext } from '../context';
import ItemCard from './ItemCard';
import TrailerPanel from './TrailerPanel';


const Results = (props) => {
    const { results, filter } = props;
    const [ imageUrl, setImageUrl ] = useState('');
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
            <div id="observer-div"></div>
            <TrailerPanel youtubeId={youtubeId} setYoutubeId={setYoutubeId} />
        </section>
    );
};

export default Results;