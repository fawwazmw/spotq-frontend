import Image from 'next/image';
import React from 'react';

const ContactInfo = () => {
   const contactInfoData = [
      {
         id: 1,
         icon_img: '/assets/img/icon/contact/office.png',
         title: 'Jl. Veteran No.10-11, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145',
         subtitle: ''
      },
      {
         id: 2,
         icon_img: '/assets/img/icon/contact/mail.png',
         title: 'spotq@gmail.com',
         subtitle: 'no-reply@spotq.com'
      },
      {
         id: 3,
         icon_img: '/assets/img/icon/contact/phone.png',
         title: '+(62) 857-6716-8814',
         subtitle: '+(62) 857-6716-8814'
      },
   ]
   return (
      <>
         <section className="contact__info pt-20 pb-120">
            <div className="contact__info-shape">
               <Image src="/assets/img/icon/contact/contact-bg.png" width={908} height={411} alt="" />
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-xxl-12">
                     <div className="page__title-wrapper text-center mb-55">
                        <h2 className="page__title-2">We would love to <b /> hear from you</h2>
                        <p>Stay in touch with us</p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  {
                     contactInfoData.map(info => {
                        return <div key={info.id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                           <div className="contact__item text-center white-bg mb-30 transition-3">
                              <div className="contact__icon mb-30 d-flex justify-content-center align-items-center">
                                 <Image src={info.icon_img} width={80} height={80} alt="" />
                              </div>
                              <div className="contact__content">
                                 <h4 className="contact__content-title">{info.title}</h4>
                                 <h4 className="contact__content-title">{info.subtitle}</h4>
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

export default ContactInfo;