import React from 'react';
import CardImage from './card_components/CardImage';
import CardHeader from './card_components/CardHeader';
import CardText from './card_components/CardText';
import CardFooter from './card_components/CardFooter';

const ItemCard = (props) => {
    const {setYoutubeId } = props;
    return (
        <div className="item-card">
            <CardImage/>
            <div className="item-card-content">
                <CardHeader />
                <CardText />
                <CardFooter setYoutubeId={setYoutubeId} />
            </div>
        </div>
    )
}

export default ItemCard;