import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BgShape from '../../components/common/BgShape';
import Pagination from '../../components/common/Pagination';
import Footer from '../../components/Home/Footer';
import Header from '../../components/Home/Header';
import SEO from '../../components/seo';
import { fetchCoffeeShops, addToProduct, addToWishList } from '../../redux/features/productSlice';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  // Redux setup
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsCategory = useSelector((state) => state.products.allUniqueCategory);
  const uniqueTags = useSelector((state) => state.products.allUniqueTag);
  const loading = useSelector((state) => state.products.loading);

  // State management
  const [filterProducts, setFilterProducts] = useState([]);
  const [categoryTag, setCategoryTag] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);

  // User authentication
  const { user } = useAuth();
  const isLoggedIn = !!user;

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchCoffeeShops());
  }, [dispatch]);

  // Update filtered products when filters or products change
  useEffect(() => {
    let filteredProducts = products;

    if (categoryTag) {
      filteredProducts = filteredProducts.filter((product) => product.category === categoryTag);
    }

    if (tagFilter) {
      filteredProducts = filteredProducts.filter((product) => product.tag === tagFilter);
    }

    setFilterProducts(filteredProducts);
  }, [categoryTag, tagFilter, products]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Ensure images are properly loaded
  const getImageUrl = (product) => {
    const url = product?.img_big?.url;
    return url && url.startsWith('http') ? url : '/placeholder-image.png';
  };

  // Handlers
  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToProduct(product));
      toast.success(`${product.title} added to cart.`);
    } else {
      toast.error('Please login to add items to the cart.');
    }
  };

  const handleAddToWishlist = (product) => {
    if (isLoggedIn) {
      dispatch(addToWishList(product));
      toast.success(`${product.title} added to wishlist.`);
    } else {
      toast.error('Please login to add items to the wishlist.');
    }
  };

  const handleCategory = (category) => {
    setCategoryTag(category);
    setCurrentPage(1); // Reset pagination
  };

  const handleTag = (tag) => {
    setTagFilter(tag);
    setCurrentPage(1); // Reset pagination
  };

  const clearFilters = () => {
    setCategoryTag('');
    setTagFilter('');
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading === 'loading') {
    return <div className="loading">Loading...</div>;
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

        <SEO pageTitle="Product" />
        <Header />
        <BgShape />

        <section className="product__area po-rel-z1 pt-100 pb-115 grey-bg">
          <div className="container">
            <div className="row">
              {/* Sidebar */}
              <div className="col-xxl-4 col-xl-4 col-lg-4 order-lg-first order-last">
                <div className="product__sidebar mr-30">
                  <div className="product__sidebar-widget white-bg mb-30">
                    {/* Category Filter */}
                    <div className="sidebar__widget mb-20">
                      <form>
                        <div className="sidebar__widget-head d-flex align-items-center justify-content-between">
                          <h4 className="sidebar__widget-title">Category</h4>
                          <button type="button" className="sidebar__clear-btn" onClick={clearFilters}>
                            <i className="fal fa-repeat"></i> Clear
                          </button>
                        </div>
                        <div className="sidebar__widget-content">
                          <div className="sidebar__check-wrapper sidebar__tag">
                            <ul>
                              {productsCategory.map((category, index) => (
                                  <li key={index} className="d-flex justify-content-between align-items-center">
                                    <div className="sidebar__check d-flex align-items-center">
                                  <span
                                      className="d-flex align-items-center"
                                      onClick={() => handleCategory(category)}
                                  >
                                    <input
                                        className="m-check-input"
                                        type="checkbox"
                                        readOnly
                                        checked={categoryTag === category}
                                    />
                                    <label className="m-check-label">{category}</label>
                                  </span>
                                    </div>
                                  </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* Tags Filter */}
                    <div className="sidebar__widget">
                      <form>
                        <div className="sidebar__widget-head d-flex align-items-center justify-content-between">
                          <h4 className="sidebar__widget-title">Tags</h4>
                        </div>
                        <div className="sidebar__widget-content">
                          <div className="sidebar__check-wrapper sidebar__tag">
                            <ul>
                              {uniqueTags.map((tag, index) => (
                                  <li key={index} className="d-flex justify-content-between align-items-center">
                                    <div className="sidebar__check d-flex align-items-center">
                                  <span
                                      className="d-flex align-items-center"
                                      onClick={() => handleTag(tag)}
                                  >
                                    <input
                                        className="m-check-input"
                                        type="checkbox"
                                        readOnly
                                        checked={tagFilter === tag}
                                    />
                                    <label className="m-check-label">{tag}</label>
                                  </span>
                                    </div>
                                  </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                <div className="row">
                  {currentProducts.map((item, index) => (
                      <div key={index} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                        <div className="product__item white-bg mb-30 wow fadeInUp" data-wow-delay=".3s">
                          <div className="product__thumb">
                            <div className="product__thumb-inner fix w-img">
                              <Link href={`/product-details?id=${item.id}`}>
                                <a>
                                  <Image
                                      src={getImageUrl(item)}
                                      alt={item?.title || 'Default alt'}
                                      width={1600}
                                      height={900}
                                      onError={(e) => {
                                        e.target.src = '/placeholder-image.png';
                                      }}
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="product__thumb-btn transition-3">
                              <a
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleAddToCart(item)}
                                  className="m-btn m-btn-6 mb-15"
                              >
                                Add To Cart
                              </a>
                              <a
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleAddToWishlist(item)}
                                  className="m-btn m-btn-7"
                              >
                                Save to Wishlist
                              </a>
                            </div>
                          </div>
                          <div className="product__content">
                            <div className="product__meta mb-10 d-flex justify-content-between align-items-center">
                              <div className="product__tag">
                                <a href="#">{item?.category}</a>
                              </div>
                              <div className="product__price">
                                <span>Rp {item?.price}</span>
                              </div>
                            </div>
                            <h3 className="product__title">
                              <Link href={`/product-details?id=${item.id}`}>
                                <a>{item?.title}</a>
                              </Link>
                            </h3>
                            <div className="mt-3">
                              <p>{item?.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                    productPerPage={productPerPage}
                    totalProduct={filterProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
  );
};

export default Product;