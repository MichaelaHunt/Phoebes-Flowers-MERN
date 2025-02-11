import { useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { ADD_ITEM_TO_CART } from "../utils/mutations";

interface Iitem {
    id: number;
    imagePath: string;
    name: string;
    price: number;
}

function Item(props: Iitem) {
    //the add item query
    const [addToCart] = useMutation(ADD_ITEM_TO_CART);

    async function itemClicked() {
        if (auth.getToken() != '') {
            let quantity = window.prompt("Please enter the quantity you'd like.");
            try {
                await addToCart({variables: { userId: auth.getUser, itemId: props.id, quantity }});
            } catch (err) {
                console.error(err);
            }
        }
        else {
            window.alert("User must be logged in to add items to the cart.");
        }
    }


    return (
        <>
            <div className="item column">
                <img src={props.imagePath} onClick={itemClicked}></img>
                <h3>{props.name}</h3>
                <p>${props.price}</p>
            </div>
        </>
    );
}

export default Item;
