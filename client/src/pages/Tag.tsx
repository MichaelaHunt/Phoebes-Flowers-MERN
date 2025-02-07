import Item from "../components/Item";
import Nav from "../components/Nav";
import Title from "../components/Title";
import { QUERY_BY_TAG } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useLocation } from "react-router-dom";
// import image from '../assets/images/bouquet1.png'

//set up a function to get the query parameter from the URL and check for the tag
function useQueryByTag() {
   return new URLSearchParams(useLocation().search); 
}

// This page is for displaying all items with a specific tag
function Tag() {
    //get the tag from the query string in the URL
    const query = useQueryByTag();
    const tag = query.get("tag");

    // fetch items with the tag
    const { loading, error, data } = useQuery(QUERY_BY_TAG, {
        variables: { tag: tag },
        // skip the query if tag is not present
        skip: !tag, 
    });
//extract items from the data
    const items = data?.items || [];

    return (
        <>
            <div className="site">
                <Title></Title>
                <Nav></Nav>
                <div id="tag">
                    <h5>Showing results for: {tag || "All"}</h5>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error loading items.</p>
                    ) : (
                    <div className="itemContainer">
                      {items.length > 0 ? (
                        items.map((item: { _id: string; imagePath: string; name: string; price: number }) => (
                            <Item
                                key={item._id}
                                imagePath="{item.imagePath || image}"
                                name={item.name}
                                price={item.price}
                            />
                        ))
                        ) : (
                        <p>No items found for "{tag}"!</p>
                        )}
                    </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tag;