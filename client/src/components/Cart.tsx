import React, { useState, useEffect, useCallback } from 'react';
import './cart.css';
import CartItem from './CartItem';

interface Props {
    open: boolean; // controls modal visibility
    cancelFn?: () => void;// function to close the modal
    primaryFn?: () => void;// primary action (e.g., "Continue")
    className?: string; // additional class for styling
}

// define item structure
interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

//Goal of this modal: It grabs the items from our User's document, then displays them.
//Also allows the user to change the quantity of each item (should be reflected in User's document)
//Allows user to remove an item from their cart (should be reflected in User's document)
function Cart(props: Props) {
    const { open, cancelFn, primaryFn} = props;

    // state to hold cart items
    // const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {id: 1, name: "Ceramic Taupe Vase", quantity: 2, price: 2.50},
        {id: 2, name: "Peach Beauty", quantity: 20, price: 3},
        {id: 3, name: "Ceramic Taupe Vase", quantity: 2, price: 2.50},
        {id: 4, name: "Peach Beauty", quantity: 20, price: 3},
        {id: 5, name: "Ceramic Taupe Vase", quantity: 2, price: 2.50},

    ]);

    function increaseQuantity() {

    }

    function decreaseQuantity() {

    }

    //function to remove item from cart
    const removeItemFromCart = (itemName: string) => {
        setCartItems((prevItems) => {
            return prevItems
                .map((item) =>
                    item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    //use effect captures esc key to close modal

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && open && cancelFn) {
            cancelFn();
        }
    }, [open, cancelFn]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, cancelFn]);

    useEffect(() => {
        decideCartBodyStyle();
    });

    function decideCartBodyStyle() {
        const cartBody = document.getElementById('cartBody');
        if (cartItems.length > 0) {
            cartBody?.classList.remove("cartHasNoItems");
        }
        else {
            cartBody?.classList.add("cartHasNoItems");
        }
    }

    // close modal when clicking outside (optional feature)
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && cancelFn) {
            cancelFn();
        }
    };

    if (!open) {
        return null;
    }
    //each cartItem * its quantity + the others

    return (
        <div className="modalBackground" onClick={handleBackgroundClick}>
                {/* modal title with close button */}
                <div className="cartHeader row">
                    {/* <h2>{itemsNumber} items</h2> */}
                    <h2>0 Items</h2>
                    <h1>Cart</h1>
                    <button id='titleCloseBtn' onClick={cancelFn}><i className="fa-solid fa-xmark"></i></button>
                </div>

                {/* cart Items Section */}
                <div className="cartHasNoItems" id='cartBody'>
                    {/* If there are items, display them. If there are no items, display a card saying "No items" */}
                    {cartItems.length > 0 ?
                        (
                            cartItems.map((item) => (
                                <CartItem key={item.id} price={item.price} title={item.name} quantity={item.quantity} increaseQuantFn={increaseQuantity} decreaseQuantFn={decreaseQuantity}></CartItem>
                            ))) : (
                            <div className='empty'>
                                <h1>No items - order some<br></br>flowers first!</h1>
                            </div>
                        )}
                </div>

                {/* footer buttons */}
                <div className="cartFooter">
                    <div className='row'>
                        <h2>Total before tax: </h2>
                        <h2>$TOTAL HERE</h2>
                    </div>
                    <button onClick={primaryFn}>Checkout</button>
                </div>
        </div>
    );
};


export default Cart;