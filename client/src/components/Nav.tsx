import './components.css'

function Nav() {
    return (
        <>
            <div className='headerBlue nav'>
                <ul className='row' id='navList'>
                    <li>Occassions</li>
                    <li>Browse Extras</li>
                    <li>Browse By Color</li>
                    <li>Custom Order</li>
                </ul>
            </div>
        </>
    );
}

export default Nav;