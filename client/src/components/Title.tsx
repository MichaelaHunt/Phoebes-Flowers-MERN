import './components.css'

function Title() {
    return (
        <>
            <div className='headerBlue title'>
                <ul className='center-row center-column' id='titleList'>
                    <li>
                        <h1 id="title">Phoebe's Flowers</h1>
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