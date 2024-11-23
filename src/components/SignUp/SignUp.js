import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useAuth from '../../hooks/useAuth'; // Mengimpor useAuth
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'; // Untuk redirect setelah register
import { toast } from 'react-toastify'; // Mengimpor react-toastify

const SignUp = () => {
   const { handleRegister } = useAuth();
   const router = useRouter(); // Untuk redirect ke halaman login
   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const onSubmit = data => {
      console.log('Form Submitted:', data);  // Log untuk melihat data form yang dikirim

      // Validasi password
      if (data.password !== data.re_password) {
         return Swal.fire({
            icon: 'error',
            title: 'Does Not Match Password',
            text: 'Please provide a correct value',
         });
      }
      if (data.password.length < 6) {
         return Swal.fire({
            icon: 'error',
            text: 'Password must be at least 6 characters',
         });
      }

      // Log sebelum melakukan registrasi
      console.log('Data for Registration:', { name: data.name, email: data.email, password: data.password });

      handleRegister(data.name, data.email, data.password, reset)
          .then(() => {
             // Jika registrasi berhasil, tampilkan notifikasi dan redirect
             toast.success('Registration successful! Redirecting to login...');
             setTimeout(() => {
                router.push('/login'); // Redirect ke halaman login
             }, 2000);
          })
          .catch((error) => {
             // Tangani error jika registrasi gagal
             toast.error(error.message || 'Registration failed. Please try again.');
          });
   };

   return (
       <>
          <section className="signup__area po-rel-z1 pt-100 pb-145">
             <div className="sign__shape">
                <Image className="man-1" src="/assets/img/icon/sign/man-3.png" width={123} height={252} alt="" />
                <Image className="man-2 man-22" src="/assets/img/icon/sign/man-2.png" width={100} height={123} alt="" />
                <Image className="circle" src="/assets/img/icon/sign/circle.png" width={25} height={20} alt="" />
                <Image className="zigzag" src="/assets/img/icon/sign/zigzag.png" width={32} height={17} alt="" />
                <Image className="dot" src="/assets/img/icon/sign/dot.png" width={33} height={63} alt="" />
                <Image className="bg" src="/assets/img/icon/sign/sign-up.png" width={624} height={680} alt="" />
                <Image className="flower" src="/assets/img/icon/sign/flower.png" width={70} height={66} alt="" />
             </div>
             <div className="container">
                <div className="row">
                   <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                      <div className="page__title-wrapper text-center mb-55">
                         <h2 className="page__title-2">Create a free <br /> Account</h2>
                         <p>Already have an account? <Link href="/login"><a>Sign In</a></Link></p>
                      </div>
                   </div>
                </div>
                <div className="row">
                   <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                      <div className="sign__wrapper white-bg">
                         <div className="sign__form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                               <div className="sign__input-wrapper mb-25">
                                  <h5>Full Name</h5>
                                  <div className="sign__input">
                                     <input
                                         {...register("name", { required: "Full Name is required" })}
                                         required
                                         type="text"
                                         placeholder="Full name"
                                     />
                                     <i className="fal fa-user"></i>
                                  </div>
                                  {errors.name && <p className="error-text">{errors.name.message}</p>}
                               </div>
                               <div className="sign__input-wrapper mb-25">
                                  <h5>Work email</h5>
                                  <div className="sign__input">
                                     <input
                                         {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                               message: "Invalid email address"
                                            }
                                         })}
                                         required
                                         type="email"
                                         placeholder="e-mail address"
                                     />
                                     <i className="fal fa-envelope"></i>
                                  </div>
                                  {errors.email && <p className="error-text">{errors.email.message}</p>}
                               </div>
                               <div className="sign__input-wrapper mb-25">
                                  <h5>Password</h5>
                                  <div className="sign__input">
                                     <input
                                         {...register("password", { required: "Password is required" })}
                                         required
                                         type="password"
                                         placeholder="Password"
                                     />
                                     <i className="fal fa-lock"></i>
                                  </div>
                                  {errors.password && <p className="error-text">{errors.password.message}</p>}
                               </div>
                               <div className="sign__input-wrapper mb-25">
                                  <h5>Confirm Password</h5>
                                  <div className="sign__input">
                                     <input
                                         {...register("re_password", { required: "Please confirm your password" })}
                                         required
                                         type="password"
                                         placeholder="Confirm password"
                                     />
                                     <i className="fal fa-lock"></i>
                                  </div>
                                  {errors.re_password && <p className="error-text">{errors.re_password.message}</p>}
                               </div>
                               <div className="sign__action d-flex justify-content-between mb-30">
                                  <div className="sign__agree d-flex align-items-center">
                                     <input required className="m-check-input" type="checkbox" id="m-agree" />
                                     <label className="m-check-label" htmlFor="m-agree">I agree to the
                                        <a href="#">Terms & Conditions</a>
                                     </label>
                                  </div>
                               </div>
                               <button type="submit" className="m-btn m-btn-4 w-100">Sign Up</button>
                               <div className="sign__new text-center mt-20">
                                  <p>Already have an account? <Link href="/login"><a>Sign In</a></Link></p>
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

export default SignUp;