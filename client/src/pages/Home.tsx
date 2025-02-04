import Nav from "../components/Nav";
import Title from "../components/Title";
import Item from "../components/Item";
import './pages.css';
import image from '../assets/images/bouquet2.png'

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
                <div>
                    <img></img>
                    <img></img>
                    <img></img>
                    <div>
                        <h1>New!</h1>
                        <h3>Mini-Bouquets in a Mug!</h3>
                        <button className="sectionButton miniButton">Shop Minis</button>
                    </div>
                </div>
            </div>
            {/* Best Seller's Section */}
            <div className="homeSection bestSellerSection">
                <div>
                    <h1 className="sectionTitle">Best Sellers</h1>
                    <div className="itemContainer">
                        {/* Update later to: Grab 3 random items, then input them into here. */}
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    </div>
                    <button className="sectionButton bestSellerButton">Shop Best Sellers</button>
                </div>
            </div>
            {/* Gifts to Accompany Section */}
            <div className="homeSection giftSection">
                <div>
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
            </div>
        </>
    );
}

export default Home;