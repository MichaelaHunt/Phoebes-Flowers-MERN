import Nav from "../components/Nav";
import Title from "../components/Title";
import Item from "../components/Item";
import './pages.css';
import { useQuery } from '@apollo/client';
// import { QUERY_SINGLE_ITEM } from "../utils/queries";
import { QUERY_BY_TAG, QUERY_RANDOM_NON_GIFT_ITEMS } from "../utils/queries";
import mug1 from '../assets/images/mug2.jpg';
import mug2 from '../assets/images/mug1.png';
import mug3 from '../assets/images/mug3.png';
import image from '../assets/images/bouquet1.png'

function Home() {
    //fetch "gift" tag items
    const { loading, error, data } = useQuery(QUERY_BY_TAG, {
        variables: { tag: "gift" }
    });
//fetch 3 random non-gift items
    const { loading: bestSellerLoading, error: bestSellerError, data: bestSellerData } = useQuery(QUERY_RANDOM_NON_GIFT_ITEMS);

//extract 6 items
const giftItems = data?.items.slice(0, 6) || [];    
//extract 3 items without "gift" tag
const bestSellers = bestSellerData?.randomNonGiftItems || [];       
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
                    <div>
                        <h2></h2>
                    </div>
                    <div id="mugImages" className="row">
                        <img src={mug1} id="mug1"></img>
                        <img src={mug2} id="mug2"></img>
                        <img src={mug3} id="mug3"></img>
                    </div>
                    <div id="mugText">
                        <h1>New!</h1>
                        <h3>Mini-Bouquets in a<br></br>Mug!</h3>
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

                {loading ? (
                    <p>Loading gifts...</p>
                ) : error ? (
                    <p>Error loading gifts.</p>
                ) : (
                    <div className="itemContainer">
                        {giftItems.map((item: { _id: string; imagePath: string; name: string; price: number }) => (
                            <Item
                                key={item._id}
                                imagePath={item.imagePath || image}
                                name={item.name}
                                price={item.price}
                            />
                        ))}
                    </div>
                )}

                <button className="sectionButton giftButton">Shop Extras</button>
            </div>
        </>
    );
}

export default Home;