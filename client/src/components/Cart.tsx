import React, {useState, useEffect, useCallback} from 'react';
import './components.css';

interface Props {
    open: boolean; // Controls modal visibility
    cancelFn?: () => void;// Function to close the modal
    primaryFn?: () => void;// Primary action (e.g., "Continue")
    secondaryFn?: () => void; // Secondary action (e.g., "Cancel")
    closeIcon?: string; // Custom close button icon
    titleContent?: React.ReactNode; // Title/header content
    className?: string; // Additional class for styling

}

// Define item structure
interface CartItem {
    name: string;
    quantity: number;
}


export const Cart: React.FC<Props> = (props) => {
    const {open, cancelFn, primaryFn, secondaryFn, closeIcon, titleContent} = props;

    // State to hold cart items
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

    // Close modal when clicking outside (optional feature)
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
                {/* Modal Title with Close Button */}
                {titleContent && (
                    <div className="title">
                        {titleContent}
                        <div className="titleCloseBtn">
                            <button onClick={cancelFn}>{closeIcon ?? 'X'}</button>
                        </div>
                    </div>
                )}

                {/* Cart Items Section */}
                <div className="cartBody">
                    <h3>Shopping Cart</h3>

                    {/* Sample Buttons to Add Items */}
                    <button onClick={() => addItemToCart('Apple')} className="addItemBtn">Add Apple</button>
                    <button onClick={() => addItemToCart('Banana')} className="addItemBtn">Add Banana</button>
                    <button onClick={() => addItemToCart('Orange')} className="addItemBtn">Add Orange</button>

                    {/* Display items in cart */}
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

                {/* Footer Buttons */}
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