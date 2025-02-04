import Nav from "../components/Nav";
import Title from "../components/Title";
import Item from "../components/Item";
import './pages.css';
import image from '../assets/images/bouquet2.png';
import mug1 from '../assets/images/mug2.jpg';
import mug2 from '../assets/images/mug1.png';
import mug3 from '../assets/images/mug3.png';

function Home() {
    return (
        <>
            {/* Header */}
            <div>
                <Title></Title>
                <Nav></Nav>
            </div>
            {/* Body */}
            {/* Mini's Section */}
            <div className="homeSection miniSection">
                <div className="row">
                    <div id="mugImages">
                        <img src={mug1} id="mug1"></img>
                        <img src={mug2} id="mug2"></img>
                        <img src={mug3} id="mug3"></img>
                    </div>
                    <div id="mugText">
                        <h1>New!</h1>
                        <h3>Mini-Bouquets in a <br></br>Mug!</h3>
                        <button className="sectionButton miniButton">Shop Minis</button>
                    </div>
                </div>
            </div>
            {/* Best Seller's Section */}
            <div className="homeSection bestSellerSection">
                <h1 className="sectionTitle">Best Sellers</h1>
                <div className="itemContainer">
                    {/* Update later to: Grab 3 random items, then input them into here. */}
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                </div>
                <button className="sectionButton bestSellerButton">Shop Best Sellers</button>
            </div>
            {/* Gifts to Accompany Section */}
            <div className="homeSection giftSection">
                <h1 className="sectionTitle">Gifts to Accompany</h1>
                <div className="itemContainer">
                    {/* Update later to: Grab items of "gift" tag, then input the first 6 into here. */}
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                </div>
                <button className="sectionButton giftButton">Shop Extras</button>
            </div>
        </>
    );
}

export default Home;