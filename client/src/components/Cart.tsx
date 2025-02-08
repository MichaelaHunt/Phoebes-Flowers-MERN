import React, { useState, useEffect, useCallback } from 'react';
import './cart.css';
import CartItem from './CartItem';

interface Props {
    open: boolean; // controls modal visibility
    cancelFn?: () => void;// function to close the modal
    primaryFn?: () => void;// primary action (e.g., "Continue")
    secondaryFn?: () => void; // secondary action (e.g., "Cancel")
    closeIcon?: string; // custom close button icon
    className?: string; // additional class for styling
}

// define item structure
interface CartItem {
    name: string;
    quantity: number;
    price: number;
}

//Goal of this modal: It grabs the items from our User's document, then displays them.
//Also allows the user to change the quantity of each item (should be reflected in User's document)
//Allows user to remove an item from their cart (should be reflected in User's document)
function Cart(props: Props) {
    const { open, cancelFn, primaryFn, secondaryFn, closeIcon } = props;

    // state to hold cart items
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    //function to add item to cart
    // const addItemToCart = (itemName: string) => {
    //     setCartItems((prevItems) => {
    //         const existingItem = prevItems.find((item) => item.name === itemName);
    //         if (existingItem) {
    //             return prevItems.map((item) =>
    //                 item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    //             );
    //         } else {
    //             return [...prevItems, { name: itemName, quantity: 1 }];
    //         }
    //     });
    // };

    // //function to remove item from cart
    // const removeItemFromCart = (itemName: string) => {
    //     setCartItems((prevItems) => {
    //         return prevItems
    //             .map((item) =>
    //                 item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
    //             )
    //             .filter((item) => item.quantity > 0);
    //     });
    // };

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

    // close modal when clicking outside (optional feature)
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && cancelFn) {
            cancelFn();
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div className="modalBackground" onClick={handleBackgroundClick}>
            <div className="modalContainer">
                {/* modal title with close button */}
                <div className="cartHeader">
                    {/* <h2>{itemsNumber} items</h2> */}
                    <h2>0 Items</h2>
                    <h1>Cart</h1>
                    <button id='titleCloseBtn' onClick={cancelFn}>{closeIcon ?? 'X'}</button>
                </div>

                {/* cart Items Section */}
                <div className="cartBody">
                    {/* If there are items, display them. If there are no items, display a card saying "No items" */}
                    {cartItems.length > 0 ? 
                    (
                        cartItems.map((item) => (
                        <CartItem price={item.price} title={item.name} quantity={item.quantity}></CartItem>
                    ))) : (
                        <div>
                            <h1>No items - order some flowers first!</h1>
                        </div>
                    )}
                    
                    {/* <ul className="cartList">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <li key={item.name} className="cartItem">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <div className="quantityControls">
                                        <button className="quantityBtn" onClick={() => removeItemFromCart(item.name)}>-</button>
                                        <button className="quantityBtn" onClick={() => addItemToCart(item.name)}>+</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="emptyCart">Your cart is empty.</p>
                        )}
                    </ul> */}
                </div>

                {/* footer buttons */}
                <div className="footer">
                    <button onClick={primaryFn}>Checkout</button>
                </div>
            </div>
        </div>
    );
};


export default Cart;