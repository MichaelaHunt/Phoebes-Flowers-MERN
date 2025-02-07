import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import './components.css';

function Title() {
    // State to control modal visibility
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Function to open the cart modal
    const openCart = () => {
        setIsCartOpen(true);
    };

    // Function to close the cart modal
    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <>
            <div className='headerBlue title'>
                <ul className='center-row center-column' id='titleList'>
                    <li>
                        <Link to='/' id="title">Phoebe's Flowers</Link>
                    </li>
                    {/* Shopping Basket Icon - Click to Open Cart */}
                    <li>
                        <i 
                            className="fa-solid fa-basket-shopping" 
                            id="basket"
                            onClick={openCart} // Open modal on click
                            style={{ cursor: 'pointer' }} // Ensure it looks clickable
                        ></i>
                    </li>
                    <li>Login/Logout</li>
                </ul>
            </div>

            {/* Cart Modal */}
            <Cart 
                open={isCartOpen} 
                cancelFn={closeCart} // Close function
                primaryFn={() => console.log('Proceed to Checkout')}
                secondaryFn={closeCart} // Optional cancel function
                titleContent={<h2>Your Shopping Cart</h2>}
                closeIcon="X"
            />
        </>
    );
}

export default Title;
