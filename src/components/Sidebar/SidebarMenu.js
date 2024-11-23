import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const SidebarMenu = ({ show, handleClose, isLoggedIn, user, logout }) => {
   const totalCartQuantity = useSelector((state) => state.products.cartTotalQuantity);

   return (
       <>
          <div>
             <Offcanvas show={show} onHide={handleClose} placement='end' className='side__bar'>
                <Offcanvas.Header closeButton>
                   <div className="logo">
                      <Link href="/home">
                         <a>
                            <Image src="assets/img/logo/logo-white.png" alt="logo"/>
                         </a>
                      </Link>
                   </div>
                </Offcanvas.Header>

                <Offcanvas.Body>
                   <div className="sidebar__content">
                      <div className="mobile-menu">
                         <nav id="mobile-menu">
                            <ul>
                               <div className='single_link iconAdd'>
                                  <li><Link href="/"><a>Home</a></Link></li>
                               </div>
                               <div className='single_link iconAdd'>
                                  <li><Link href="/product"><a>Cafe</a></Link></li>
                               </div>
                               <div className='single_link iconAdd'>
                                  <li><Link href="/about"><a>About</a></Link></li>
                               </div>
                               <div className='single_link iconAdd'>
                                  <li><Link href="/contact"><a>Contact</a></Link></li>
                               </div>
                               <div className='single_link iconAdd'>
                                  <li><Link href="/wishlist"><a>Wishlist</a></Link></li>
                               </div>
                               <div className='single_link iconAdd'>
                                  <li><Link href="/cart"><a>Cart Page</a></Link></li>
                               </div>
                            </ul>
                         </nav>
                      </div>

                      {/* Sidebar Action Section */}
                      <div className="sidebar__action d-flex align-items-center">
                         <div className="sidebar__cart mt-20">
                            <Link href="/cart">
                               <a className="cart-toggle-btn">
                                  <i className="far fa-shopping-cart"></i>
                                  <span>{totalCartQuantity}</span>
                               </a>
                            </Link>
                         </div>

                         {/* Display user login status and log out option */}
                         <div className="sidebar__user mt-20">
                            {isLoggedIn ? (
                                <>
                                   <p>Welcome, {user.name}</p>
                                   <a onClick={logout} style={{cursor: 'pointer'}}
                                      className="d-flex align-items-center">
                                      <i className="fal fa-sign-out-alt"></i> Log Out
                                   </a>
                                </>
                            ) : (
                                <Link href="/login">
                                   <a>
                                      <i className="far fa-unlock"></i> Log In
                                   </a>
                                </Link>
                            )}
                         </div>
                      </div>
                   </div>
                </Offcanvas.Body>
             </Offcanvas>
          </div>
       </>
   );
};

export default SidebarMenu;