import CardImage from "./card_components/CardImage";
import CardHeader from "./card_components/CardHeader";
import CardText from "./card_components/CardText";
import CardFooter from "./card_components/CardFooter";

const ItemCard = ({ item }: { item: ResultItem }) => (
    <article className="item-card">
        <CardImage item={item} />
        <div className="item-card-content">
            <CardHeader item={item} />
            <CardText item={item} />
            <CardFooter item={item} />
        </div>
    </article>
);

export default ItemCard;
