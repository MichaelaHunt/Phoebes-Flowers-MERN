import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import './components.css';
import auth from '../utils/auth';

function Title() {
    // State to control modal visibility
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Function to open the cart modal
    const openCart = () => {
        addOverlay();
        setIsCartOpen(true);
    };

    // Function to close the cart modal
    const closeCart = () => {
        removeOverlay();
        setIsCartOpen(false);
    };

    function addOverlay() {
        const home = document.getElementById('home');
        home?.classList.add("overlay");
    }

    function removeOverlay() {
        const home = document.getElementById('home');
        home?.classList.remove("overlay");
    }

    function handleLogout() {
        auth.logout();
    }

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

                    {auth.getToken() == '' ?
                        <li>
                            <Link to={'/login'}>Login</Link>
                        </li>
                        :
                        <li style={{cursor: "pointer"}} onClick={handleLogout}>Logout</li>
                    }
                </ul>
            </div>
            <div className='cartHolder'>
                {/* Cart Modal */}
                <Cart
                    open={isCartOpen}
                    cancelFn={closeCart} // Close function
                    primaryFn={() => console.log('Proceed to Checkout')}
                />
            </div>

        </>
    );
}

export default Title;
