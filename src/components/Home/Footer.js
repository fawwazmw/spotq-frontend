import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
   return (

      <footer>
         <div className="footer__area footer-bg">
            <div className="footer__top pt-90 pb-50">
               <div className="container">
                  <div className="row">
                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-4">
                        <div className="footer__widget mb-40 wow fadeInUp" data-wow-delay=".3s">
                           <div className="footer__widget-head mb-35">
                              <h4 className="footer__widget-title">Follow our Socials</h4>
                           </div>
                           <div className="footer__widget-content">
                              <div className="footer__social mb-30">
                                 <ul>
                                    <li><Link href="#"><a className="fb"><i
                                        className="fab fa-facebook-f"></i></a></Link>
                                    </li>
                                    <li><Link href="#"><a href="#" className="tw"><i className="fab fa-twitter"></i></a></Link>
                                    </li>
                                    <li><Link href="#"><a href="#" className="pin"><i
                                        className="fab fa-pinterest-p"></i></a></Link>
                                    </li>
                                 </ul>
                              </div>
                              <div className="footer__lang">
                                 <span><Link href="#"><a>US</a></Link> English</span>
                                 <span><Link href="#"><a>ES</a></Link> Spanish</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-4">
                        <div className="footer__widget mb-40 wow fadeInUp" data-wow-delay=".9s">
                           <div className="footer__widget-head">
                              <h4 className="footer__widget-title">Products</h4>
                           </div>
                           <div className="footer__widget-content">
                              <div className="footer__link">
                                 <ul>
                                    <li><Link href="/"><a>Home</a></Link></li>
                                    <li><Link href="/product"><a>Cafe</a></Link></li>
                                    <li><Link href="/about"><a>About Us</a></Link></li>
                                    <li><Link href="/contact"><a>Contact</a></Link></li>
                                    <li><Link href="/wislist"><a>Wishlist</a></Link></li>
                                    <li><Link href="/cart"><a>Cart</a></Link></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="footer__bottom">
               <div className="container">
                  <div className="footer__bottom-inner">
                     <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-md-6">
                           <div className="footer__copyright wow fadeInUp" data-wow-delay=".5s">
                              <p>Copyright © 2024 All Rights Reserved, Develop by <Link href="#"><a>SpotQ
                                 Developers</a></Link></p>
                           </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-md-6">
                           <div className="footer__bottom-link wow fadeInUp text-md-end" data-wow-delay=".8s">
                              <ul>
                                 <li><Link href="#"><a>Licence</a></Link></li>
                                 <li><Link href="#"><a>Privacy Policy </a></Link></li>
                                 <li><Link href="#"><a>Affiliate Notice</a></Link></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>

   );
};

export default Footer;