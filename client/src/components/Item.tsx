import { useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { ADD_ITEM_TO_CART } from "../utils/mutations";
import { ReactNode } from "react";

interface Iitem {
    id: number;
    imagePath: string;
    name: string;
    price: number;
}

function Item(props: Iitem) {
    //the add item query
    const [addToCart, { data, loading, error }] = useMutation(ADD_ITEM_TO_CART);

    async function itemClicked() {
        if (auth.getToken() != '') {
            let response = window.prompt("Please enter the quantity you'd like.");
            //response could be null if user cancels the prompt! TODO:
            let quantity: number;
            if (response) {
                let quantity = parseInt(response);
                try {
                    // console.log("itemId: " + props.id);
                    var res = await addToCart({variables: { userId: String(auth.getUser()), itemId: props.id, quantity }});//HERE TODO:
                    console.log("mutation response")
                } catch (err) {
                    console.error(err);
                }
            }
            
        }
        else {
            window.alert("User must be logged in to add items to the cart.");
        }
    }

    function formatPrice(): ReactNode {
            var val = props.price
            return val.toFixed(2);
        }


    return (
        <>
            <div className="item column">
                <img src={props.imagePath} onClick={itemClicked}></img>
                <h3>{props.name}</h3>
                <p>${formatPrice()}</p>
            </div>
        </>
    );
}

export default Item;
