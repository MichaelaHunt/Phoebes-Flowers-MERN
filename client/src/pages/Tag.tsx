import Item from "../components/Item";
import Nav from "../components/Nav";
import Title from "../components/Title";
import image from '../assets/images/bouquet1.png'
import { QUERY_BY_TAG } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useLocation } from "react-router-dom";

function useQueryByTag() {}

// This page is for displaying all items with a specific tag
function Tag() {
    //fetch all items with a specific tag

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