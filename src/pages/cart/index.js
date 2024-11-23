import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleCart from '../../components/Cart/SingleCart';
import Breadcrumb from '../../components/common/Breadcrumb';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import Header from '../../components/Home/Header';
import { addToProduct, clearCart, decreaseCart, getTotal, removeProduct } from '../../redux/features/productSlice';
import Footer from '../../components/Home/Footer';
import Swal from 'sweetalert2';
import BgShape from '../../components/common/BgShape';
import useCartInfo from '../../hooks/use-cart-info';
import SEO from '../../components/seo';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProductCart = () => {
   const [mountedCart, setMountedCart] = useState(false);
   const [errorMsg, setErrorMsg] = useState(false);
   const [orders, setOrders] = useState([]);
   const cartItem = useSelector((state) => state.products.addToCart);
   const dispatch = useDispatch();
   const { total } = useCartInfo();
   const { user, loading } = useAuth();
   const isLoggedIn = !!user;
   const router = useRouter();

   useEffect(() => {
      if (loading) {
         return;
      }

      if (!user) {
         toast.error('Anda harus login untuk mengakses halaman cart.', {
            onClose: () => router.push('/login'),
         });
      }
   }, [user, loading, router]);

   // cartItem
   useEffect(() => {
      if (cartItem.length > 0 || orders.length > 0) {
         setMountedCart(true);
         setErrorMsg(false);
      }
      if (cartItem.length === 0 && orders.length === 0) {
         setErrorMsg(true);
         setMountedCart(false)
      }
   }, [cartItem, orders, mountedCart, errorMsg])

   // handleSubmit
   const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Coupon not available this time',
      })
   }

   // handleClearCart
   const handleClearCart = () => {
      Swal.fire({
         title: 'Are you sure?',
         text: "Deleted your all cart items",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(clearCart());
            setMountedCart(false);
            Swal.fire(
                'Deleted!',
                'Your cart items has been deleted.',
                'success'
            )
         }
      })
   }

   // handleDecreaseCart
   const handleDecreaseCart = (cart) => {
      dispatch(decreaseCart(cart))
      if (cart.cartQuantity === 1) {
         setMountedCart(false)
      }
   }

   // handleIncreaseCart
   const handleIncreaseCart = (cart) => {
      dispatch(addToProduct(cart))
   }

   // handle remove product
   const handleRemoveProduct = (id) => {
      dispatch(removeProduct(id));
   }

   // Fetch orders after successful checkout
   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await axios.get(`http://localhost:1337/api/bookeds?filters[user][id]=${user.id}`);
            setOrders(response.data.data);
         } catch (error) {
            console.error('Error fetching orders:', error);
         }
      };

      if (user && !loading) {
         fetchOrders();
      }
   }, [user, loading]);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (!user) {
      return null;
   }

   return (
       <>
          <SEO pageTitle={'Cart'} />
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Zoom}
          />

          <Header />
          <BgShape />
          <Breadcrumb name="Your Cart" title="Cart" />
          {errorMsg && <ErrorMsg />}
          {mountedCart && (
              <section className="cart-area pb-100">
                 <div className="container">
                    <div className="row">
                       <div className="col-12">
                          <form onSubmit={handleSubmit}>
                             <div className="table-content table-responsive">
                                <table className="table">
                                   <thead>
                                   <tr>
                                      <th className="product-thumbnail">Images</th>
                                      <th className="cart-product-name">Product</th>
                                      <th className="product-price">Unit Price</th>
                                      <th className="product-quantity">Quantity</th>
                                      <th className="product-subtotal">Total</th>
                                      <th className="product-remove">Remove</th>
                                   </tr>
                                   </thead>
                                   <tbody className='border-0'>
                                   {cartItem.map((item, index) => (
                                       <SingleCart
                                           key={index}
                                           cart={item}
                                           handleIncreaseCart={handleIncreaseCart}
                                           handleDecreaseCart={handleDecreaseCart}
                                           handleRemoveProduct={handleRemoveProduct}
                                       />
                                   ))}
                                   </tbody>
                                </table>
                             </div>

                             <div className="row">
                                <div className="col-12">
                                   <div className="coupon-all">
                                      <div className="coupon">
                                         <input id="coupon_code" required className="input-text" name="coupon_code" defaultValue="" placeholder="Coupon code" type="text" />
                                         <button className="m-btn m-btn-border-2 cta__btn active" name="apply_coupon" type="submit">Apply coupon</button>
                                      </div>
                                      <div className="coupon2">
                                         <button onClick={handleClearCart} className="m-btn m-btn-border-2 cta__btn active" name="update_cart" type="button">Clear cart</button>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             <div className="row justify-content-end">
                                <div className="col-md-5">
                                   <div className="cart-page-total">
                                      <h2>Cart totals</h2>
                                      <ul className="mb-20">
                                         <li>Subtotal <span>Rp {total}</span></li>
                                         <li>Total <span>Rp {total}</span></li>
                                      </ul>
                                      <Link href="/checkout">
                                         <a className="m-btn m-btn-border-2 cta__btn active">Proceed to checkout</a>
                                      </Link>
                                   </div>
                                </div>
                             </div>
                          </form>
                       </div>
                    </div>
                 </div>
              </section>
          )}

          {/* Receipt Section */}
          {orders.length > 0 && (
              <section className="cart-area pb-100">
                 <div className="container">
                    <div className="row">
                       <div className="col-12">
                          <div className="table-content table-responsive">
                             <table className="table">
                                <thead>
                                <tr>
                                   <th>Order ID</th>
                                   <th>Order Date</th>
                                   <th>Café Name</th>
                                   <th>Room Name</th>
                                   <th>Booking Status</th>
                                   <th>Rating</th>
                                   <th>Review</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                       <td>{order.id}</td>
                                       <td>{new Date(order.attributes.createdAt).toLocaleDateString()}</td>
                                       <td>{order.attributes.cafe_name}</td>
                                       <td>{order.attributes.room_name}</td>
                                       <td>{order.attributes.booking_status}</td>
                                       <td>
                                          {/* Fetch and display the rating */}
                                          {order.attributes.rating}
                                       </td>
                                       <td>
                                          {/* Fetch and display the review */}
                                          {order.attributes.comment}
                                       </td>
                                    </tr>
                                ))}
                                </tbody>
                             </table>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
          )}

          {/* footer */}
          <Footer />
       </>
   );
};

export default ProductCart;