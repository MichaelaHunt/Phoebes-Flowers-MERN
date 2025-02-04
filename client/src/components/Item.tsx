interface Iitem {
    imagePath: string;
    name: string;
    price: number;
}

function Item(props: Iitem) {
    return (
        <>
            <div className="item column">
                <img src={props.imagePath}></img>
                <h3>{props.name}</h3>
                <p>${props.price}</p>
            </div>
        </>
    );
}

export default Item;