//import Cart from './Cart';
import { Link } from 'react-router-dom';
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
                                <li><Link to='/tag?tag=wedding'>Wedding</Link></li>
                                <li><Link to='/tag?tag=get%20well'>Get Well</Link></li>
                                <li><Link to='/tag?tag=condolences'>Condolences</Link></li>
                                <li><Link to='/tag?tag=romance'>Romance</Link></li>
                                <li><Link to='/tag?tag=birthday'>Birthday</Link></li>
                                <li><Link to='/tag?tag=congratulations'>Congratulations</Link></li>
                                <li><Link to='/tag?tag=thank%20you'>Thank you</Link></li>
                            </ul>
                    </li>

                    <li>Browse Extras</li>

                    <li className="dropdown">
                        <span>Browse By Color</span>
                        <ul className='dropdown-menu'>
                            <ul className='dropdown-menu'>
                                <li><Link to='/tag?tag=pink'>Pink</Link></li>
                                <li><Link to='/tag?tag=red'>Red</Link></li>
                                <li><Link to='/tag?tag=gold'>Gold</Link></li>
                                <li><Link to='/tag?tag=yellow'>Yellow</Link></li>
                                <li><Link to='/tag?tag=blue'>Blue</Link></li>
                                <li><Link to='/tag?tag=purple'>Purple</Link></li>
                                <li><Link to='/tag?tag=pastel'>Pastel</Link></li>
                                <li><Link to='/tag?tag=silver'>Silver</Link></li>
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