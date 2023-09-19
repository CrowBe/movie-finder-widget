import React from 'react';
import CardImage from './card_components/CardImage';
import CardHeader from './card_components/CardHeader';
import CardText from './card_components/CardText';
import CardFooter from './card_components/CardFooter';

const ItemCard = (props) => {
    // Pull the callback that sets the trailer id off props
    const {setYoutubeId } = props;

    // item card content can be set into a reusable component.
    return (
        <div className="item-card">
            <CardImage/>
            <div className="item-card-content">
                <CardHeader />
                <CardText />
                {/* Pass the state setter down to the component that holds the play button */}
                <CardFooter setYoutubeId={setYoutubeId} />
            </div>
        </div>
    )
}

export default ItemCard;