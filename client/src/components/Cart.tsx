import { useState, useEffect, useCallback, useContext } from 'react';
import './cart.css';
import { useMutation, useQuery } from '@apollo/client';
import { ALTER_QUANTITY_IN_CART, REMOVE_ITEM_FROM_CART } from '../utils/mutations';
import AuthService from '../utils/auth';
import { CartContext, CartItemInfo } from '../utils/cartContext';
import { QUERY_USER } from '../utils/queries';
import auth from '../utils/auth';
import CartItem from './CartItem';

interface Props {
    open: boolean; // controls modal visibility
    cancelFn?: () => void;// function to close the modal
    primaryFn?: () => void;// primary action (e.g., "Continue")
    className?: string; // additional class for styling
}

//Goal of this modal: It grabs the items from our User's document, then displays them.
//Also allows the user to change the quantity of each item (should be reflected in User's document)
//Allows user to remove an item from their cart (should be reflected in User's document)
function Cart(props: Props) {
    const { open, cancelFn, primaryFn } = props;

    // state to hold cart items
    const { cartContents, setCartContents } = useContext(CartContext);

    //add mutations for altering quantity and removing item from cart
    const [alterQuantityInCart] = useMutation(ALTER_QUANTITY_IN_CART);
    const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
    var username = auth.getUsername();
    const { loading: userLoading, data } = useQuery(QUERY_USER, {
        variables: { username },
        // skip the query if tag is not present
        skip: !username, 
    });

    const transformCartData = (cart: any[]): CartItemInfo[] => {
        return cart.map(item => ({
          id: item.inventoryItem._id,
          name: item.inventoryItem.name,
          quantity: item.quantity,
          price: item.inventoryItem.price
        }));
    };

    useEffect(() => {
        if (data?.user?.cart && !userLoading) {
            // console.log("user.cart exists");
            const input: CartItemInfo[] = transformCartData(data.user.cart);
            setCartContents(input);  // This will only run when `data` changes
        }
    }, [data, userLoading, setCartContents]);

    
    
    // Function to increase the quantity of an item in the cart
    const increaseQuantity = async (itemId: number) => {
        // Get userId from AuthService
        const userId = AuthService.getUser();
        // If user is not logged in, return
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }
        //try to increase the quantity of the item in the cart
        try {
            const { data } = await alterQuantityInCart({
                //pass in the userId, itemId, and quantityChange
                variables: { userId, itemId, quantityChange: 1 },
            });
            
            //if the data exists, update the quantity of the item in the cart
            if (data) {
                setCartContents((prevItems) =>
                    prevItems.map((item) =>
                        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
                    )//TODO: if this don't work it may need to be _id
                );
            }
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    //function to decrease quantity of an item in cart
    const decreaseQuantity = async (itemId: number) => {
        // Get userId from AuthService
        const userId = AuthService.getUser();
        //if user is not logged in, return
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }
        try {
            //check to make sure the item exists and that the quantity is greater than 1
            const item = cartContents.find((item) => item.id === itemId);
            //if not, return
            if (!item || item.quantity <= 1) return;
            //create a new item with the updated quantity
            const { data } = await alterQuantityInCart({
                //pass in the userId, itemId, and quantityChange
                variables: { userId, itemId, quantityChange: -1 },
            });
            //if the data exists, update the quantity of the item in the cart
            if (data) {
                setCartContents((prev) =>
                    prev.map(item =>
                        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
                    )
                );
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    //function to remove an item from the cart
    const removeItem = async (itemId: number) => {
        // Get userId from AuthService
        const userId = AuthService.getUser();
        //if user is not logged in, return
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }
        try {
            const { data } = await removeItemFromCart({
                variables: { userId, itemId },
            });

            if (data) {
                //remove the item from the cart
                setCartContents((prevItems) => prevItems.filter((item) => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

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
        if (cartContents.length > 0) {
            cartBody?.classList.remove("cartHasNoItems");
        }
        else {
            cartBody?.classList.add("cartHasNoItems");
        }
    }

    if (!open) {
        return null;
    }
    //each cartItem * its quantity + the others

    return (
        <div className="modalBackground">
            {/* modal title with close button */}
            <div className="cartHeader row">
                {/* <h2>{itemsNumber} items</h2> */}
                <h2>0 Items</h2>
                {/* <div style={{visibility: "hidden"}}><h3>I am invisible</h3></div> */}
                <h1>Cart</h1>
                {/* <button onClick={refreshCart}><i className="fa-solid fa-arrows-rotate"></i></button> */}
                <button id='titleCloseBtn' onClick={cancelFn}><i className="fa-solid fa-xmark"></i></button>
            </div>

            {/* cart Items Section */}
            <div className="cartHasNoItems" id='cartBody'>
                {/* If there are items, display them. If there are no items, display a card saying "No items" */}
                {cartContents.length > 0 ?
                    (
                        cartContents.map((item) => (
                            <CartItem key={item.id}
                                id={item.id}
                                price={item.price}
                                title={item.name}
                                quantity={item.quantity}
                                increaseQuantFn={increaseQuantity}
                                decreaseQuantFn={decreaseQuantity}
                                removeItemFn={removeItem}>
                            </CartItem>
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