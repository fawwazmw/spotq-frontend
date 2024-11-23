import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToProduct, addToWishList, fetchCoffeeShops, specificItem } from '../../redux/features/productSlice';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailsArea = () => {
   // Redux hooks
   const product = useSelector((state) => state.products.specificProduct);
   const products = useSelector((state) => state.products.products);
   const loading = useSelector((state) => state.products.loading);
   const dispatch = useDispatch();

   // Router hooks
   const router = useRouter();
   const { id } = router.query; // Get the product ID from the URL

   // Local state for error handling
   const [error, setError] = useState(null);

   // Fetch product details
   useEffect(() => {
      if (id) {
         console.log(`Fetching details for Product ID: ${id}`); // Debugging log
         if (!products.length) {
            dispatch(fetchCoffeeShops())
                .unwrap()
                .then((response) => {
                   const selectedProduct = response.find((p) => p.id === parseInt(id));
                   if (selectedProduct) {
                      dispatch(specificItem(selectedProduct.id));
                   } else {
                      console.error(`Product with ID ${id} not found.`);
                      setError('Product not found.');
                   }
                })
                .catch((err) => {
                   console.error('Error fetching products:', err);
                   setError('Failed to fetch products.');
                });
         } else {
            const selectedProduct = products.find((p) => p.id === parseInt(id));
            if (selectedProduct) {
               dispatch(specificItem(selectedProduct.id));
            } else {
               console.error(`Product with ID ${id} not found in preloaded products.`);
               setError('Product not found.');
            }
         }
      }
   }, [id, products, dispatch]);

   // Add product to cart
   const handleCartProduct = () => {
      if (product) dispatch(addToProduct(product));
   };

   // Add product to wishlist
   const handleAddToWishlist = () => {
      if (product) dispatch(addToWishList(product));
   };

   // Format description with new lines
   const formatDescription = (description) => {
      if (!description) return '';
      return description.split('\n').map((line, index) => (
          <span key={index}>
            {line}
             <br />
         </span>
      ));
   };

   // Handle loading state
   if (loading === 'loading') {
      return (
          <div className="product__area">
             <div className="container">
                <div className="row">
                   <div className="col-12 text-center">
                      <p>Loading product details...</p>
                   </div>
                </div>
             </div>
          </div>
      );
   }

   // Handle error state
   if (error) {
      return (
          <div className="product__area">
             <div className="container">
                <div className="row">
                   <div className="col-12 text-center">
                      <p>{error}</p>
                   </div>
                </div>
             </div>
          </div>
      );
   }

   // Handle no product found
   if (!product) {
      return (
          <div className="product__area">
             <div className="container">
                <div className="row">
                   <div className="col-12 text-center">
                      <p>Product details not available. Please check the product ID.</p>
                   </div>
                </div>
             </div>
          </div>
      );
   }

   return (
       <section className="product__area pb-115">
          <div className="container">
             <div className="row">
                {/* Product Details Main */}
                <div className="col-xxl-8 col-xl-8 col-lg-8">
                   <div className="product__wrapper">
                      <div className="product__details-thumb w-img mb-30">
                         <Image
                             src={product?.img_big?.url || '/placeholder-image.png'}
                             alt={product?.title || 'Default alt'}
                             width={1000}
                             height={500}
                             objectFit={"cover"}
                         />
                      </div>
                      <div className="product__details-content">
                         <div className="product__tab mb-40">
                            <ul className="nav nav-tabs" id="proTab" role="tablist">
                               <li className="nav-item" role="presentation">
                                  <button
                                      className="nav-link active"
                                      id="overview-tab"
                                      data-bs-toggle="tab"
                                      data-bs-target="#overview"
                                      type="button"
                                      role="tab"
                                      aria-controls="overview"
                                      aria-selected="true"
                                  >
                                     Overview
                                  </button>
                               </li>
                            </ul>
                         </div>
                         <div className="product__tab-content">
                            <div className="tab-content" id="proTabContent">
                               <div
                                   className="tab-pane fade show active"
                                   id="overview"
                                   role="tabpanel"
                                   aria-labelledby="overview-tab"
                               >
                                  <div className="product__overview">
                                     <h3 className="product__overview-title">Template Details</h3>
                                     <p>{formatDescription(product.description)}</p>
                                     <div className="product__social m-social grey-bg-2">
                                        <h4 className="product__social-title">Follow us</h4>
                                        <ul>
                                           <li>
                                              <a href="#" className="fb">
                                                 <i className="fab fa-instagram"></i>
                                              </a>
                                           </li>
                                           <li>
                                              <a href="#" className="tw">
                                                 <i className="fab fa-twitter"></i>
                                              </a>
                                           </li>
                                           <li>
                                              <a href="#" className="pin">
                                                 <i className="fab fa-pinterest-p"></i>
                                              </a>
                                           </li>
                                           <li>
                                              <a href="#" className="link">
                                                 <i className="fab fa-facebook-f"></i>
                                              </a>
                                           </li>
                                        </ul>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Product Details Sidebar */}
                <div className="col-xxl-4 col-xl-4 col-lg-4">
                   <div className="product__details-sidebar ml-30">
                      <div className="product__proprietor white-bg mb-30">
                         <div className="product__proprietor-head mb-25">
                            <div className="product__prorietor-info mb-20 d-flex justify-content-end">
                               <div className="product__proprietor-price">
                                 <span className="d-flex align-items-start">
                                    <span>Rp </span>
                                    {product.price}
                                 </span>
                               </div>
                            </div>
                            <div className="product__proprietor-text">
                               <p>{product.location}</p>
                            </div>
                         </div>
                         <div className="product__proprietor-body fix">
                            <ul className="mb-10 fix">
                               <li>
                                  <h6>Booked:</h6>
                                  <span>{product.book}</span>
                               </li>
                               <li>
                                  <h6>Capacity:</h6>
                                  <span>{product.tag}</span>
                               </li>
                               <li>
                                  <h6>Status:</h6>
                                  <span>{product.status}</span>
                               </li>
                               <li>
                                  <h6>Room:</h6>
                                  <span>{product.category}</span>
                               </li>
                            </ul>
                            <span>
                              <a
                                  style={{ cursor: 'pointer' }}
                                  onClick={handleCartProduct}
                                  className="m-btn m-btn-2 w-100 mb-20"
                              >
                                 <span></span> Add To Cart
                              </a>
                           </span>
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={handleAddToWishlist}
                                className="m-btn m-btn-border w-100"
                            >
                               Save to Wishlist
                            </a>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>
   );
};

export default ProductDetailsArea;
