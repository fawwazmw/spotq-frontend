import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginArea = () => {
   const { handleGoogleSignIn, loginUser, passwordResetEmail } = useAuth();
   const [email, setEmail] = useState('');
   const router = useRouter();

   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const onSubmit = (data) => {
      console.log('Login Data:', data);
      loginUser(data.email, data.password, reset)
          .then(() => {
             toast.success('Login successful! Redirecting...');
             setTimeout(() => {
                router.push('/');
             }, 2000);
          })
          .catch((error) => {
             if (error.message === 'Login failed. Please check your email and password.') {
                toast.error('Maaf, email atau password Anda salah. Silakan coba lagi.');
             } else {
                toast.error(error.message || 'Terjadi kesalahan saat login. Silakan coba lagi.');
             }
          });
   };

   const handleForgotPassword = () => {
      console.log('Password reset requested for email:', email);
      passwordResetEmail(email)
          .then(() => {
             toast.success('Email reset password telah dikirim. Silakan cek kotak masuk Anda.');
          })
          .catch((error) => {
             toast.error(error.message || 'Terjadi kesalahan saat mengirim email reset password.');
          });
   };

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

          <section className="signup__area po-rel-z1 pt-100 pb-145">
             <div className="sign__shape">
                <Image className="man-1" src="/assets/img/icon/sign/man-1.png" width={130} height={250} alt="" />
                <Image className="man-2" src="/assets/img/icon/sign/man-2.png" width={100} height={123} alt="" />
                <Image className="circle" src="/assets/img/icon/sign/circle.png" width={25} height={20} alt="" />
                <Image className="zigzag" src="/assets/img/icon/sign/zigzag.png" width={32} height={17} alt="" />
                <Image className="dot" src="/assets/img/icon/sign/dot.png" width={33} height={63} alt="" />
                <Image className="bg" src="/assets/img/icon/sign/sign-up.png" width={624} height={680} alt="" />
             </div>
             <div className="container">
                <div className="row">
                   <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                      <div className="page__title-wrapper text-center mb-55">
                         <h2 className="page__title-2">Sign in to <br /> recharge direct.</h2>
                         <p>Don&apos;t have an account? <Link href="/sign-up"><a>Register here!</a></Link></p>
                      </div>
                   </div>
                </div>
                <div className="row">
                   <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                      <div className="sign__wrapper white-bg">
                         <div className="sign__form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                               <div className="sign__input-wrapper mb-25">
                                  <h5>Email</h5>
                                  <div className="sign__input">
                                     <input
                                         {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                               message: "Invalid email address"
                                            }
                                         })}
                                         onChange={(e) => setEmail(e.target.value)}
                                         type="email"
                                         placeholder="e-mail address"
                                     />
                                     <i className="fal fa-envelope"></i>
                                  </div>
                                  {errors.email && <p className="error-text">{errors.email.message}</p>}
                               </div>
                               <div className="sign__input-wrapper mb-10">
                                  <h5>Password</h5>
                                  <div className="sign__input">
                                     <input
                                         {...register("password", { required: "Password is required" })}
                                         type="password"
                                         placeholder="Password"
                                     />
                                     <i className="fal fa-lock"></i>
                                  </div>
                                  {errors.password && <p className="error-text">{errors.password.message}</p>}
                               </div>
                               <div className="sign__action d-sm-flex justify-content-between mb-30">
                                  <div className="sign__agree d-flex align-items-center">
                                     <input className="m-check-input" type="checkbox" id="m-agree" />
                                     <label className="m-check-label" htmlFor="m-agree">Keep me signed in</label>
                                  </div>
                                  <div className="sign__forgot">
                                     <button
                                         style={{cursor:'pointer',background:'transparent'}}
                                         onClick={handleForgotPassword}
                                         type="button"
                                     >
                                        Forgot password?
                                     </button>
                                  </div>
                               </div>
                               <button type="submit" className="m-btn m-btn-4 w-100">Sign In</button>
                               <div className="sign__new text-center mt-20">
                                  <p>Don&apos;t have an account? <Link href="/sign-up"><a>Sign Up</a></Link></p>
                               </div>
                            </form>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>
       </>
   );
};

export default LoginArea;