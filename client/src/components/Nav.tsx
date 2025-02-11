//import Cart from './Cart';
import './components.css'
import { useState } from 'react';

function Nav() {
    const [showOccasions, setShowOccasions] = useState(false);
    const [showColors, setShowColors] = useState(false);

    return (
        <>
            <div className='headerBlue nav'>
                <ul className='row' id='navList'>
                    <li className="dropdown">
                        <span>Occasions</span>
                            <ul className='dropdown-menu'>
                                <li>Wedding</li>
                                <li>Get Well</li>
                                <li>Condolences</li>
                                <li>Romance</li>
                                <li>Birthday</li>
                                <li>Congratulations</li>
                                <li>Thank You</li>
                            </ul>
                    </li>

                    <li>Browse Extras</li>

                    <li className="dropdown">
                        <span>Browse By Color</span>
                        <ul className='dropdown-menu'>
                            <ul className='dropdown-menu'>
                                <li>Pink</li>
                                <li>Red</li>
                                <li>Gold</li>
                                <li>Yellow</li>
                                <li>Blue</li>
                                <li>Purple</li>
                                <li>Pastel</li>
                                <li>Silver</li>
                            </ul>
        
                        </ul>
                    </li>
                    

                    <li>Custom Order</li>
                </ul>
            </div>
        </>
    );
}

export default Nav;