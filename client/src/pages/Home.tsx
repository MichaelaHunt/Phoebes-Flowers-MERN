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
    console.log("Query Data:", bestSellerData);
    console.log("Query Error:", bestSellerError);

    //extract 6 items
    const giftItems = data?.items.slice(0, 6) || [];
    //extract 3 items without "gift" tag
    const bestSellers = bestSellerData?.randomNonGiftItems || [];

    //do a state where if the modal is open, the user cannot scroll.
    
    function miniButtonHandler() {
        window.location.assign('/tag?tag=mini');
    }

    function giftsButtonHandler() {
        window.location.assign('/tag?tag=gift');
    }

    function bestSellerButtonHandler() {
        window.location.assign('/tag?tag=best%20seller');
    }

    return (
        <>
            <div id="home">
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
                            <button className="sectionButton miniButton" onClick={miniButtonHandler}>Shop Minis</button>
                        </div>
                    </div>
                </div>
                {/* Best Seller's Section */}
                <div className="homeSection bestSellerSection">
                    <h1 className="sectionTitle">Best Sellers</h1>

                    {bestSellerLoading ? (
                        <p>Loading best sellers...</p>
                    ) : bestSellerError ? (
                        <p>Error loading best sellers.</p>
                    ) : (
                        <div className="itemContainer">
                            {bestSellers.map((item: { _id: number; imagePath: string; name: string; price: number }) => (
                                <Item
                                    key={item._id}
                                    id={item._id}
                                    imagePath={item.imagePath || image}
                                    name={item.name}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    )}

                    <button className="sectionButton bestSellerButton" onClick={bestSellerButtonHandler}>Shop Best Sellers</button>
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
                            {giftItems.map((item: { _id: number; imagePath: string; name: string; price: number }) => (
                                <Item
                                    key={item._id}
                                    id={item._id}
                                    imagePath={item.imagePath || image}
                                    name={item.name}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    )}

                    <button className="sectionButton giftButton" onClick={giftsButtonHandler}>Shop Gifts</button>
                </div>
            </div>
        </>
    );
}

export default Home;