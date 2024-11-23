import Image from 'next/image';
import React from 'react';

const AboutArea = () => {
    return (
        <>
            <section className="about__area pt-100">
            <div className="container">
               <div className="row">
                  <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1">
                     <div className="about__wrapper">
                        <span className="about__sub-title">About SpotQ</span>
                        <h3 className="about__title">Solusi Booking Cafe dengan Sekali Sentuh.</h3>
                        <div className="about__thumb w-img wow fadeInUp" data-wow-delay=".3s">
                           <Image src="/assets/img/about/about-1.jpg" width={970} height={600} alt=""/>
                        </div>
                        <div className="about__count pt-50 pb-15 wow fadeInUp" data-wow-delay=".5s">
                           <div className="row">
                              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                 <div className="about__count-item text-center launche mb-30">
                                    <p>LAUNCHED IN</p>
                                    <h4><span className="counter">2024</span></h4>
                                 </div>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                 <div className="about__count-item text-center community mb-30">
                                    <p>BOOKED OF</p>
                                    <h4><span className="counter">100</span>+</h4>
                                 </div>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                 <div className="about__count-item text-center mission mb-30">
                                    <p>CAFE LIST</p>
                                    <h4><span className="counter">20</span>+</h4>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="about__content">
                           <p className="about__text">{`Selamat datang di SpotQ, tempat yang menawarkan kenyamanan dan kemudahan dalam menikmati waktu santai Anda! Dengan slogan "Solusi Booking Café dengan Sekali Sentuh," kami hadir untuk memberikan pengalaman baru dalam menikmati kopi dan makanan lezat tanpa repot.  Kami percaya bahwa waktu adalah hal yang berharga. Karena itu, kami ingin menghilangkan segala kerumitan yang seringkali menghalangi Anda untuk menikmati momen istirahat yang sempurna. Melalui aplikasi dan sistem pemesanan kami yang inovatif, Anda hanya perlu satu sentuhan untuk memesan meja atau makanan favorit Anda, kapan saja dan di mana saja.`}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        </>
    );
};

export default AboutArea;