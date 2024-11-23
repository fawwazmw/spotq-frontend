import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct, specificItem } from '../../redux/features/productSlice';

const SingleCart = ({ cart, handleDecreaseCart, handleIncreaseCart, handleRemoveProduct }) => {
    const dispatch = useDispatch();

    const getImageUrl = (product) => {
        return product?.img_big?.url || '/placeholder-image.png';
    };

    return (
        <tr>
            <td className="product-thumbnail">
                <Link href={`/product-details?id=${cart.id}`}>
                    <a onClick={() => dispatch(specificItem(cart.id))}>
                        <Image
                            src={`${getImageUrl(cart)}`}
                            alt={cart?.title || 'Default alt'}
                            width={120}
                            height={100}
                            objectFit="cover"
                        />
                    </a>
                </Link>
            </td>
            <td className="product-name">
                <Link href={`/product-details?id=${cart.id}`}>
                    <a onClick={() => dispatch(specificItem(cart.id))}>{cart?.title}</a>
                </Link>
            </td>
            <td className="product-price"><span className="amount">Rp {cart?.price}</span></td>
            <td className="product-quantity">
                <div className="cart-plus-minus">
                    <span>{cart?.cartQuantity}</span>
                    <div onClick={() => handleDecreaseCart(cart)} className="dec qtybutton">-</div>
                    <div onClick={() => handleIncreaseCart(cart)} className="inc qtybutton">+</div>
                </div>
            </td>
            <td className="product-subtotal"><span className="amount">Rp {cart?.price * cart?.cartQuantity}</span></td>
            <td style={{ cursor: 'pointer' }} onClick={() => handleRemoveProduct(cart?.id)} className="product-remove"><a><i className="fa fa-times"></i></a></td>
        </tr>
    );
};

export default SingleCart;