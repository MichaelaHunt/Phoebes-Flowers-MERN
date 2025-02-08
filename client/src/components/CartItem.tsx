import './cart.css';

interface ciProps {
    title: string,
    quantity: number,
    price: number
}

function CartItem(props: ciProps) {
    return (
        <>
            <div className='cartItem'>
                <i className="fa-solid fa-trash"></i>
                <div>
                    <h1>{props.title}</h1>
                    <h5>{props.quantity}</h5>
                </div>
                <h3>{props.price}</h3>
            </div>
        </>
    );
}

export default CartItem;