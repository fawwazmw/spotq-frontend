import Image from 'next/image';
import React from 'react';

const HomeThreeHeroArea = () => {
   return (
      <>
         <section className="hero__area hero__height hero__height-3 grey-bg-3 d-flex align-items-center" 
         style={{background:`url(assets/img/hero/sl-bg-2.png)`,backgroundSize:'cover',backgroundPosition:'center'}}>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-xxl-9 col-xl-10 col-lg-11 col-md-12 col-sm-12">
                     <div className="hero__content hero__content-white text-center">
                        <h2 className="hero__title">
                           Solusi Booking Cafe dengan Sekali Sentuh.
                        </h2>
                        <p>Website ini menawarkan berbagai fitur yang memudahkan<br/> pengguna dalam mencari dan memesan kafe.</p>
                        {/*<div className="hero__search">*/}
                        {/*   <form action="#">*/}
                        {/*      <div className="hero__search-inner hero__search-3 d-md-flex align-items-center">*/}
                        {/*         <div className="hero__search-input">*/}
                        {/*            <span><i className="far fa-search"></i></span>*/}
                        {/*            <input type="text" placeholder="Search for cafe"/>*/}
                        {/*         </div>*/}
                        {/*         <button type="submit" className="m-btn ml-20"> <span></span> search</button>*/}
                        {/*      </div>*/}
                        {/*   </form>*/}
                        {/*</div>*/}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default HomeThreeHeroArea;