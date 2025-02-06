import Item from "../components/Item";
import Nav from "../components/Nav";
import Title from "../components/Title";
import image from '../assets/images/bouquet1.png'


function Tag() {
    return (
        <>
            <div className="site">
                <Title></Title>
                <Nav></Nav>
                <div id="tag">
                    <h5>Showing results for: Wedding</h5>
                    <div className="itemContainer">
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                        <Item imagePath={image} name="Pale Beach" price={2.50}></Item>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tag;