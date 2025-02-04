import Nav from "../components/Nav";
import Title from "../components/Title";

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
            <div>
                <div>
                    <img></img>
                    <img></img>
                    <img></img>
                    <div>
                        <h1>New!</h1>
                        <h3>Mini-Bouquets in a Mug!</h3>
                        <button>Shop Minis</button>
                    </div>
                </div>
            </div>
            {/* Best Seller's Section */}
            <div>
                <div>
                    <h1>Best Sellers</h1>
                    <div>
                        {/* items in here */}
                    </div>
                    <button>Shop Best Sellers</button>
                </div>
            </div>
            {/* Gifts to Accompany Section */}
            <div>
                <div>
                    <h1>Gifts to Accompany</h1>
                    <div>
                        {/* items here */}
                    </div>
                    <button>Shop Extras</button>
                </div>
            </div>
        </>
    );
}

export default Home;