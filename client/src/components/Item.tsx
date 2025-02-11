import { useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { ADD_TO_CART } from "../utils/mutations";

interface Iitem {
    imagePath: string;
    name: string;
    price: number;
}

function Item(props: Iitem) {
    //the add item query
    let addToCart = useMutation(ADD_TO_CART);

    function itemClicked() {
        if (auth.getToken() != '') {
            console.log("User labeled as Logged In");
            let quantity = window.prompt("Please enter the quantity you'd like.");
            // try {
            //     await addToCart({variables: { itemId, quantity }});
            // } catch (err) {
            //     console.error(err);
            // }

        }
        else {
            console.log("User labeled as Logged Out!");
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
