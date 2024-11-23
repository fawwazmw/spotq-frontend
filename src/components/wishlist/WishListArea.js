import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToProduct, removeWishListProduct, specificItem } from '../../redux/features/productSlice';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

const WishListArea = () => {
   const wishlist = useSelector(state => state.products.wishlist);
   const [mountedWishlist, setMountedWishlist] = useState(false);
   const [errorMsg, setErrorMsg] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      if (wishlist.length > 0) {
         setMountedWishlist(true)
         setErrorMsg(false)
      }
      else if (wishlist.length === 0) {
         setErrorMsg(true)
         setMountedWishlist(false)
      }
   }, [wishlist])

   const getImageUrl = (product) => {
      return product?.img_big?.url || '/placeholder-image.png';
   };

   const handleAddProduct = (product) => {
      dispatch(addToProduct(product))
   }

   return (
       <>
          <section className="cart-area cart-area pb-100">
             <div className="container">
                <div className="row">
                   {errorMsg && <ErrorMsg errTitle="No product found" />}
                   {mountedWishlist && (
                       <div className="col-12">
                          <form action="#">
                             <div className="table-content table-responsive">
                                <table className="table">
                                   <thead>
                                   <tr>
                                      <th className="product-thumbnail">Images</th>
                                      <th className="cart-product-name">Product</th>
                                      <th className="product-quantity">Add To Cart</th>
                                      <th className="product-subtotal">Price</th>
                                      <th className="product-remove">Remove</th>
                                   </tr>
                                   </thead>
                                   <tbody className='border-0'>
                                   {wishlist.map(product => (
                                       <tr key={product.id}>
                                          <td onClick={() => dispatch(specificItem(product.id))} className="product-thumbnail">
                                             <Link href={`/product-details?id=${product.id}`}>
                                                <a>
                                                   <Image
                                                       src={`${getImageUrl(product)}`}
                                                       alt={product?.title || 'Default alt'}
                                                       width={150}
                                                       height={100}
                                                       objectFit="cover"
                                                   />
                                                </a>
                                             </Link>
                                          </td>
                                          <td className="product-name" onClick={() => dispatch(specificItem(product.id))}>
                                             <Link href={`/product-details?id=${product.id}`}>
                                                <a>{product.title}</a>
                                             </Link>
                                          </td>
                                          <td className="product-quantity">
                                             <Link href="/cart">
                                                <a onClick={() => handleAddProduct(product)} className="m-btn m-btn-border-2 cta__btn active">Add To Cart</a>
                                             </Link>
                                          </td>
                                          <td className="product-subtotal"><span className="amount">Rp {product.price}</span></td>
                                          <td onClick={() => dispatch(removeWishListProduct(product))} className="product-remove">
                                             <i style={{ cursor: 'pointer' }} className="fa fa-times"></i>
                                          </td>
                                       </tr>
                                   ))}
                                   </tbody>
                                </table>
                             </div>
                          </form>
                       </div>
                   )}
                </div>
             </div>
          </section>
       </>
   );
};

export default WishListArea;