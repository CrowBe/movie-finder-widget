import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import tmdbClient from '../api/tmdbClient';

const Results = (props) => {
    const { trending, results } = props;
    const [ imageUrl, setImageUrl ] = useState('');

    useEffect(() => {
        tmdbClient.get('/configuration')
            .then(response => {
                setImageUrl(`${response.data.images.secure_base_url}w185`)
            })
            .catch(err => console.log(err));
    });

    if (results.length > 0) {
        return (
            <div>
                {results.map((item) => {
                    return <ItemCard key={item.id} item={item} imageUrl={imageUrl} />
                })}
            </div>
        )
    };

    return (
        <div>
            {trending.map((item) => {
                return <ItemCard key={item.id} item={item} imageUrl={imageUrl} />
            })}
        </div>
    );
};

export default Results;