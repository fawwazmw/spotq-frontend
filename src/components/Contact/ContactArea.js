import Image from 'next/image';
import React from 'react';

const ContactArea = () => {
   return (
      <>
      <section className="contact__area pt-105 pb-145">
            <div className="contact__shape">
               <Image className="man-1" src="/assets/img/icon/sign/man-1.png" width={170} height={173} alt=""/>
               <Image className="circle" src="/assets/img/icon/sign/circle.png" width={25} height={20} alt=""/>
               <Image className="zigzag" src="/assets/img/icon/sign/zigzag.png" width={32} height={17} alt=""/>
               <Image className="dot" src="/assets/img/icon/sign/dot.png" width={33} height={63} alt=""/>
               <Image className="bg" src="/assets/img/icon/sign/sign-up.png" width={624} height={680} alt=""/>
            </div>
            <div className="container">
               <div className="row">
                  <div className="col-xxl-12">
                     <div className="page__title-wrapper mb-55">
                        <h2 className="page__title-2">Leave Us a Message.</h2>
                        <p>Berikan kami kritikan dan saran, jika ada kesalahan juga tidak masalah.</p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-xxl-7 col-xl-7">
                     <div className="contact__wrapper white-bg">
                        <div className="contact__form">
                           <form action="https://formspree.io/f/mkgnbapj"
                                 method="POST">  {/* Replace with your Formspree URL */}
                              <div className="row">
                                 <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                    <div className="contact__input-wrapper mb-25">
                                       <h5>Full Name</h5>
                                       <div className="contact__input">
                                          <input required type="text" placeholder="Full name" name="name"/>
                                          <i className="fal fa-user"></i>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                    <div className="contact__input-wrapper mb-25">
                                       <h5>Work email</h5>
                                       <div className="contact__input">
                                          <input required type="text" placeholder="e-mail address" name="email"/>
                                          <i className="fal fa-envelope"></i>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-xxl-12">
                                    <div className="contact__input-wrapper mb-25">
                                       <h5>Message</h5>
                                       <div className="contact__input textarea">
                                          <textarea required placeholder="Tell us a bit about your project"
                                                    name="message"></textarea>
                                          <i className="fal fa-comment"></i>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-xxl-12">
                                    <button type="submit" className="m-btn m-btn-4"><span></span>Submit</button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-5 col-xl-5">
                     <div className="contact__map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31610.854388380092!2d112.60395518553909!3d-7.962029834003699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827f2d620975%3A0xf19b7459bbee5ed5!2sUniversitas%20Brawijaya!5e0!3m2!1sid!2sid!4v1731674802228!5m2!1sid!2sid"></iframe>
                     </div>
                  </div>
               </div>
            </div>
      </section>
      </>
   );
};

export default ContactArea;