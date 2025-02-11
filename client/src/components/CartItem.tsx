import { ReactNode } from 'react';
import './cart.css';

interface ciProps {
    id: number,
    title: string,
    quantity: number,
    price: number
    increaseQuantFn: (itemId: number) => Promise<void>;
    decreaseQuantFn: (itemId: number) => Promise<void>;
    removeItemFn: (itemId: number) => Promise<void>;
}

function CartItem(props: ciProps) {
    const { title, quantity, price, increaseQuantFn, decreaseQuantFn, removeItemFn } = props;

    function formatPrice(): ReactNode {
        var val = price * props.quantity
        return val.toFixed(2);
    }

    return (
        <>
            <div className='cartItem row'>
                <div className='cartItemDetails row'>
                    <button onClick={() => removeItemFn(props.id)}><i className="fa-solid fa-trash"></i></button>
                    <h2>{title} (</h2>
                    <div className='row quantity'>
                        <button onClick={() => decreaseQuantFn(props.id)} id='decreaseButton'><i className="fa-solid fa-minus quantityButtons"></i></button>
                        <h2>&ensp;{quantity}&ensp;</h2>
                        <button onClick={() => increaseQuantFn(props.id)} id='increaseButton'><i className="fa-solid fa-plus quantityButtons"></i></button>
                    </div>
                    <h2>)</h2>
                </div>
                <h2>${formatPrice()}</h2>
            </div>
        </>
    );
}

export default CartItem;