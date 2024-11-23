import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useSticky from '../../hooks/useSticky';
import SidebarMenu from '../Sidebar/SidebarMenu';

const HomeThreeHeader = () => {
   // sticky
   const { sticky } = useSticky();
   const stickyRef = useRef(null);

   // handle sidebar show
   const [show, setShow] = useState(false);
   // handle close
   const handleClose = () => setShow(false);
   // handle sidebar show
   const handleShow = () => setShow(true);

   // user
   const { user, logout } = useAuth();
   const isLoggedIn = !!user;

   useEffect(() => {
      const headerElement = document.getElementById('header-sticky');
      stickyRef.current = headerElement;

      return () => {
         if (stickyRef.current) {
            stickyRef.current = null;
         }
      };
   }, []);

   useEffect(() => {
      console.log('User in HomeThreeHeader:', user); // Add this line
   }, [user]);

   return (
       <>
          <header>
             <div
                 className={
                    sticky
                        ? 'sticky header__area header__shadow-2 white-bg header-transparent'
                        : 'header__area header__shadow-2 white-bg header-transparent'
                 }
                 id="header-sticky"
                 ref={stickyRef}
             >
                <div className="container">
                   <div className="row align-items-center">
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-6">
                         <div className="logo">
                            <Link href="/">
                               <a>
                                  <Image src="/assets/img/logo/logo-white.png" alt="logo" width={133} height={40}/>
                               </a>
                            </Link>
                         </div>
                      </div>
                      <div className="col-xxl-7 col-xl-7 col-lg-8 d-none d-lg-block">
                         <div className="main-menu d-flex justify-content-end h3_menu">
                            <nav id="mobile-menu">
                               <ul>
                                  <li>
                                     <Link href="/">
                                        <a>Home</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href="/product">
                                        <a>Cafe</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href="/about">
                                        <a>About</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href="/contact">
                                        <a>Contact</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href="/wishlist">
                                        <a>Wishlist</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href="/cart">
                                        <a>Cart Page</a>
                                     </Link>
                                  </li>
                                  <li>
                                     {isLoggedIn && (
                                         <div className="d-flex flex-column mr-4 text-white">
                                            <span>Welcome, {user.username}</span>
                                         </div>
                                     )}
                                  </li>
                               </ul>
                            </nav>
                         </div>
                      </div>
                      <div className="col-xxl-3 col-xl-3 col-lg-2 col-md-8 col-6">
                         <div className="header__action d-flex align-items-center justify-content-end">
                            <div className="header__action d-flex align-items-center justify-content-end">
                               <div className="header__login header__login-2 d-none d-sm-block">
                                  {isLoggedIn ? (
                                      <div className="d-flex align-items-center">
                                         <a onClick={logout} style={{cursor: 'pointer'}}
                                            className="d-flex align-items-center">
                                            <i className="fal fa-sign-out-alt mr-2"></i> Log Out
                                         </a>
                                      </div>
                                  ) : (
                                      <Link href="/login">
                                         <a>
                                            <i className="far fa-unlock"></i> Log In
                                         </a>
                                      </Link>
                                  )}
                               </div>
                               <div className="header__btn d-none d-xl-block ml-4">
                                  <Link href="/product">
                                     <a className="m-btn m-btn-2">book now</a>
                                  </Link>
                               </div>
                            </div>
                            <div className="sidebar__menu d-lg-none" onClick={handleShow}>
                               <div className="sidebar-toggle-btn" id="sidebar-toggle">
                                  <span className="line"></span>
                                  <span className="line"></span>
                                  <span className="line"></span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </header>

          <SidebarMenu show={show} handleClose={handleClose} isLoggedIn={isLoggedIn} user={user} logout={logout}/>
       </>
   );
};

export default HomeThreeHeader;