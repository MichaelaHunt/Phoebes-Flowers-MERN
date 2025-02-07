import auth from "../utils/auth";

interface Iitem {
    imagePath: string;
    name: string;
    price: number;
}

function Item(props: Iitem) {
    function itemClicked() {
        if (auth.getToken() != '') {
            console.log("User labeled as Logged In");
            //dialog or something?
        }
        else {
            console.log("User labeled as Logged Out!")
            //alert()
        }
        //if they are signed in, then ask how many they'd like
        //if they are not signed in, pop up a dialog that asks them to please log in. 
    }
    return (
        <>
            <div className="item column">
                <img src={props.imagePath} onClick={itemClicked}></img>
                <h3>{props.name}</h3>
                <p>${props.price}</p>
            </div>
        </>
    );
}

export default Item;
