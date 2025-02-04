import './components.css'
import { Link } from 'react-router-dom';

function Title() {
    return (
        <>
            <div className='headerBlue title'>
                <ul className='center-row center-column' id='titleList'>
                    <li>
                        <Link to='/' id="title">Phoebe's Flowers</Link>
                    </li>
                    <li>
                        <i className="fa-solid fa-basket-shopping" id="basket"></i>
                    </li>
                    <li>Login/Logout</li>
                </ul>
            </div>
        </>
    );
}

export default Title;