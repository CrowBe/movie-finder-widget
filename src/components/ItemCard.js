import React from 'react';
import CardImage from './elements/CardImage';
import CardHeader from './elements/CardHeader';
import CardText from './elements/CardText';
import CardFooter from './elements/CardFooter';

const ItemCard = (props) => {
    const {setYoutubeId } = props;
    return (
        <div className="item-card">
            <CardImage/>
            <div>
                <CardHeader />
                <CardText />
                <CardFooter setYoutubeId={setYoutubeId} />
            </div>
        </div>
    )
}

export default ItemCard;