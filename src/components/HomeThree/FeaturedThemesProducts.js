import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoffeeShops, addToProduct, addToWishList } from '../../redux/features/productSlice';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeaturedThemesProducts = () => {
   // Redux setup
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products.products);
   const loading = useSelector((state) => state.products.loading);
   const error = useSelector((state) => state.products.error); // Mengambil error state dari Redux

   const { user } = useAuth();
   const isLoggedIn = !!user;

   // State for featured products
   const [featuredProducts, setFeaturedProducts] = useState([]);

   // Fetch products on component mount
   useEffect(() => {
      console.log('Fetching products...');
      dispatch(fetchCoffeeShops())
          .then((response) => {
             console.log('Fetch successful:', response);
          })
          .catch((err) => {
             console.error('Fetch failed:', err);
          });
   }, [dispatch]);

   // Filter featured products after fetching
   useEffect(() => {
      if (products.length) {
         const filtered = products.slice(0, 6); // Adjust range for featured products
         console.log('Filtered products:', filtered);
         setFeaturedProducts(filtered);
      }
   }, [products]);

   // Ensure images are properly loaded
   const getImageUrl = (product) => {
      return product?.img_big?.url || '/placeholder-image.png';
   };

   // Handlers
   const handleAddToCart = (product) => {
      if (isLoggedIn) {
         dispatch(addToProduct(product));
         toast.success(`${product.title} added to cart.`);
      } else {
         toast.error('Please login to add items to the cart.', {
            position: 'top-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
         });
      }
   };

   const handleAddToWishlist = (product) => {
      if (isLoggedIn) {
         dispatch(addToWishList(product));
         toast.success(`${product.title} added to wishlist.`);
      } else {
         toast.error('Please login to add items to the wishlist.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
         });
      }
   };

   if (loading === 'loading') {
      return <div className="loading">Loading featured products...</div>;
   }

   if (loading === 'failed') {
      console.error('Error loading products:', error);
      return <div className="error">Failed to load products: {error}</div>;
   }

   return (
       <>
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
          <section className="product__area pt-105 pb-110 grey-bg-2">
             <div className="container">
                <div className="row">
                   <div className="col-xxl-12">
                      <div className="section__title-wrapper text-center mb-60">
                         <h2 className="section__title">Most People Book Cafe of The Month</h2>
                         <p>From multipurpose cafe in Malang</p>
                      </div>
                   </div>
                </div>
                <div className="row">
                   {featuredProducts.map((product, index) => (
                       <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                          <div className="product__item white-bg mb-30 wow fadeInUp" data-wow-delay=".3s">
                             <div className="product__thumb">
                                <div className="product__thumb-inner fix w-img">
                                   <Link href={`/product-details?id=${product.id}`}>
                                      <a>
                                         <Image
                                             src={getImageUrl(product)}
                                             width={1000}
                                             height={700}
                                             objectFit={"cover"}
                                             alt={product.title || 'Product Image'}
                                             onError={(e) => {
                                                console.error('Image load error:', e.target.src);
                                                e.target.src = '/placeholder-image.png';
                                             }}
                                         />
                                      </a>
                                   </Link>
                                </div>
                                <div className="product__thumb-btn transition-3">
                                   <a
                                       style={{ cursor: 'pointer' }}
                                       onClick={() => handleAddToCart(product)}
                                       className="m-btn m-btn-6 mb-15"
                                   >
                                      Add to Cart
                                   </a>
                                   <Link href={`/product-details?id=${product.id}`}>
                                      <a className="m-btn m-btn-7">Details</a>
                                   </Link>
                                </div>
                             </div>
                             <div className="product__content">
                                <h3 className="product__title product__title2">
                                   <Link href={`/product-details?id=${product.id}`}>
                                      <a>{product.title}</a>
                                   </Link>
                                </h3>
                                <p className="product__author">{product?.location}</p>
                                <div className="product__ratings">
                                   <i className="fas fa-star"></i>
                                   <i className="fas fa-star"></i>
                                   <i className="fas fa-star"></i>
                                   <i className="fas fa-star"></i>
                                   <i className="fas fa-star"></i>
                                </div>
                                <div className="product__meta d-flex justify-content-between align-items-end mt-15">
                                   <div className="product__price">
                                      <span>Rp {product.price}</span>
                                   </div>
                                   <div className="product__action-btn">
                                      <button onClick={() => handleAddToWishlist(product)} className="link_heart">
                                         <i className="fal fa-heart"></i>
                                      </button>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                   ))}
                </div>
                <div className="row">
                   <div className="col-xxl-12">
                      <div className="product__more text-center mt-30">
                         <Link href="/product">
                            <a className="m-btn m-btn-2"> <span></span> Explore More</a>
                         </Link>
                      </div>
                   </div>
                </div>
             </div>
          </section>
       </>
   );
};

export default FeaturedThemesProducts;
