import React, {useState, useEffect, useCallback} from 'react';
import './components.css';

interface Props {
    open: boolean; // controls modal visibility
    cancelFn?: () => void;// function to close the modal
    primaryFn?: () => void;// primary action (e.g., "Continue")
    secondaryFn?: () => void; // secondary action (e.g., "Cancel")
    closeIcon?: string; // custom close button icon
    titleContent?: React.ReactNode; // title/header content
    className?: string; // additional class for styling

}

// define item structure
interface CartItem {
    name: string;
    quantity: number;
}


export const Cart: React.FC<Props> = (props) => {
    const {open, cancelFn, primaryFn, secondaryFn, closeIcon, titleContent} = props;

    // state to hold cart items
    const [cartItems, setCartItems] = useState<CartItem[]>([]);


    //funtion to add item to cart
    const addItemToCart = (itemName: string) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.name === itemName);
        if (existingItem) {
            return prevItems.map((item) =>
                item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            return [...prevItems, { name: itemName, quantity: 1 }];
        }
    });
};



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
            if(e.key === 'Escape' && open && cancelFn) {
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

    if(!open) {
        return null;
    }
        
    return (
        <div className="modalBackground" onClick={handleBackgroundClick}>
            <div className="modalContainer">
                {/* modal title with close button */}
                {titleContent && (
                    <div className="title">
                        {titleContent}
                        <div className="titleCloseBtn">
                            <button onClick={cancelFn}>{closeIcon ?? 'X'}</button>
                        </div>
                    </div>
                )}

                {/* cart Items Section */}
                <div className="cartBody">
                    <h3>Shopping Cart</h3>

                    {/* sample buttons to add items */}
                    <button onClick={() => addItemToCart('Apple')} className="addItemBtn">Add Apple</button>
                    <button onClick={() => addItemToCart('Banana')} className="addItemBtn">Add Banana</button>
                    <button onClick={() => addItemToCart('Orange')} className="addItemBtn">Add Orange</button>

                    {/* display items in cart */}
                    <ul className="cartList">
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
                    </ul>
                </div>

                {/* footer buttons */}
                <div className="footer">
                    {secondaryFn && (
                        <button onClick={secondaryFn} id="cancelBtn">
                            Cancel
                        </button>
                    )}
                    {primaryFn && (
                        <button onClick={primaryFn}>Checkout</button>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Cart;