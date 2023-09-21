import CardImage from "./card_components/CardImage";
import CardHeader from "./card_components/CardHeader";
import CardText from "./card_components/CardText";
import CardFooter from "./card_components/CardFooter";

const ItemCard = ({ item }: { item: ResultItem }) => {
    // Pull the callback that sets the trailer id off props

    // item card content can be set into a reusable component.
    return (
        <div className="item-card">
            <CardImage item={item} />
            <div className="item-card-content">
                <CardHeader item={item} />
                <CardText item={item} />
                {/* Pass the state setter down to the component that holds the play button */}
                <CardFooter item={item} />
            </div>
        </div>
    );
};

export default ItemCard;
