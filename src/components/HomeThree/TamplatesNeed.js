import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TamplatesNeed = () => {
   const tamplateData = [
      {
         id: 1,
         icon_img: "/assets/img/icon/services/services-1.svg",
         bg_color: 'blue-bg-4',
         title: <h3 className="services__title"><a href="#">Pencarian Informasi</a></h3>,
         desc: 'Kemudahan dalam pencarian dan pemesanan kafe yang sesuai preferensi pengguna.'
      },
      {
         id: 2,
         icon_img: "/assets/img/icon/services/services-2.svg",
         bg_color: 'pink-bg',
         title: <h3 className="services__title"><Link href="/about"><a>Informasi Lengkap</a></Link></h3>,
         desc: 'Informasi detail menu, harga, foto dan aspek lainnya.'
      },
      {
         id: 3,
         icon_img: "/assets/img/icon/services/services-3.svg",
         bg_color: 'green-bg',
         title: <h3 className="services__title"><Link href="/about"><a >Rating & Review</a></Link></h3>,
         desc: 'Rating dan review terhadap kafe yang mendorong transparansi dan kepercayaan.'
      },
      {
         id: 4,
         icon_img: "/assets/img/icon/services/services-4.svg",
         bg_color: 'orange-bg',
         title: <h3 className="services__title"><Link href="/about"><a >Kemudahan Administrasi</a></Link></h3>,
         desc: 'Struk digital untuk setiap transaksi'
      },
      {
         id: 5,
         icon_img: "/assets/img/icon/services/services-5.svg",
         bg_color: 'blue-bg',
         title: <h3 className="services__title"><Link href="/about"><a>Fitur Chat</a></Link></h3>,
         desc: 'Komunikasi langsungdengan pihak kafe.'
      },
   ]
   return (
      <>
         <section className="services__area pt-100 pb-110">
            <div className="container">
               <div className="row">
                  <div className="col-xxl-12">
                     <div className="section__title-wrapper mb-50 text-center">
                        <h2 className="section__title">The only one <br />Booking cafe you need</h2>
                        <p>From multipurpose cafe in Malang</p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  {
                     tamplateData.map(item => {
                        return <div key={item.id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                           <div className="services__item white-bg mb-30 wow fadeinup" data-wow-delay=".3s">
                              <div className="services__icon mb-45">
                                 <span className={item.bg_color}>
                                    <Image src={item.icon_img} alt="" width={426} height={426}/>
                                 </span>
                              </div>
                              <div className="services__content">
                                 {item.title}
                                 <p>{item.desc}</p>
                                 <Link href="/about" >
                                    <a className="link-btn">
                                       <i className="fas fa-long-arrow-alt-right"></i>
                                    Learn More</a>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     })
                  }

               </div>
            </div>
         </section>
      </>
   );
};

export default TamplatesNeed;