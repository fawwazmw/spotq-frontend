import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import Order from './Order';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

// Helper function for axios request with better error logging
const sendOrderToStrapi = async (orderData) => {
   try {
      const response = await axios.post('http://localhost:1337/api/bookeds', orderData, {
         headers: {
            'Content-Type': 'application/json',
            // Add authentication if needed
         }
      });
      console.log('Order placed successfully:', response.data);
      return { success: true };
   } catch (error) {
      if (error.response) {
         console.error('Error placing order:', error.response.data);
         // Log the specific error message from Strapi for debugging
      } else {
         console.error('Error:', error.message);
      }
      return { success: false, message: 'There was an error placing your order. Please try again.' };
   }
};

const CheckoutArea = () => {
   const { user } = useAuth();
   const [formData, setFormData] = useState({
      fullName: user?.username || '', // Username akan jadi nilai awal
      email: user?.email || '',
      phone: '',
      address: {
         street_address: '',
         apartment: '',
         town_city: '',
         state_country: '',
         postcode_zip: ''
      },
      status: 'pending',
      roomId: null,
   });

   // Handle changes in input fields
   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'email') {
         // Do not allow changing email
         return;
      }
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   // Handle changes in address fields
   const handleAddressChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         address: {
            ...formData.address,
            [name]: value,
         },
      });
   };

   // Function to handle the order submission
   const handleOrderSubmit = async (orderData) => {
      try {
         const response = await axios.post('http://localhost:1337/api/bookeds', orderData, {
            headers: {
               'Content-Type': 'application/json',
               // Add authentication if needed
            },
         });
         console.log('Order placed successfully:', response.data);

         // Setelah order berhasil, hapus semua item dari cart
         dispatch(clearCart());
         setMountedCart(false);

         Swal.fire({
            icon: 'success',
            title: 'Order placed successfully!',
            text: 'Your booking has been successfully placed.',
         });
      } catch (error) {
         if (error.response) {
            console.error('Error placing order:', error.response.data);
         } else {
            console.error('Error:', error.message);
         }
         Swal.fire({
            icon: 'error',
            title: 'Order Failed',
            text: 'There was an error placing your order. Please try again.',
         });
      }
   };

   return (
       <section className="checkout-area pb-100">
          <div className="container">
             <form>
                <div className="row">
                   <div className="col-lg-6">
                      <div className="checkbox-form">
                         <h3>Billing Details</h3>
                         <div className="row">
                            {/* Full Name Field */}
                            <div className="col-md-12">
                               <div className="checkout-form-list">
                                  <label>Full Name <span className="required">*</span></label>
                                  <input
                                      required
                                      type="text"
                                      name="fullName"
                                      value={formData.fullName}
                                      onChange={handleChange}
                                      placeholder={user?.username || 'Enter your full name'} // Tambahkan placeholder
                                  />
                               </div>
                            </div>

                            {/* Address Fields */}
                            <div className="col-md-12">
                               <div className="checkout-form-list">
                                  <label>Street Address <span className="required">*</span></label>
                                  <input
                                      required
                                      type="text"
                                      name="street_address"
                                      value={formData.address.street_address}
                                      onChange={handleAddressChange}
                                      placeholder="Street Address"
                                  />
                               </div>
                            </div>
                            <div className="col-md-12">
                               <div className="checkout-form-list">
                                  <input
                                      type="text"
                                      name="apartment"
                                      value={formData.address.apartment}
                                      onChange={handleAddressChange}
                                      placeholder="Apartment, Suite, Unit etc."
                                  />
                               </div>
                            </div>
                            <div className="col-md-12">
                               <div className="checkout-form-list">
                                  <label>Town / City <span className="required">*</span></label>
                                  <input
                                      required
                                      type="text"
                                      name="town_city"
                                      value={formData.address.town_city}
                                      onChange={handleAddressChange}
                                      placeholder="Town / City"
                                  />
                               </div>
                            </div>
                            <div className="col-md-6">
                               <div className="checkout-form-list">
                                  <label>State / County <span className="required">*</span></label>
                                  <input
                                      required
                                      type="text"
                                      name="state_country"
                                      value={formData.address.state_country}
                                      onChange={handleAddressChange}
                                      placeholder="State / County"
                                  />
                               </div>
                            </div>
                            <div className="col-md-6">
                               <div className="checkout-form-list">
                                  <label>Postcode / Zip <span className="required">*</span></label>
                                  <input
                                      required
                                      type="text"
                                      name="postcode_zip"
                                      value={formData.address.postcode_zip}
                                      onChange={handleAddressChange}
                                      placeholder="Postcode / Zip"
                                  />
                               </div>
                            </div>
                            {/* Email Field */}
                            <div className="col-md-6">
                               <div className="checkout-form-list">
                                  <label>Email Address <span className="required">*</span></label>
                                  <input
                                      required
                                      type="email"
                                      name="email"
                                      value={user?.email || formData.email}
                                      onChange={handleChange}
                                      disabled={!!user}
                                      className={user ? 'bg-gray-100' : ''}
                                  />
                               </div>
                            </div>
                            <div className="col-md-6">
                               <div className="checkout-form-list">
                                  <label>Phone <span className="required">*</span></label>
                                  <input
                                      required
                                      type="text"
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleChange}
                                      placeholder="Telephone Number"
                                  />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Order section */}
                   <Order
                       formData={formData}
                       setFormData={setFormData}
                       handleOrderSubmit={handleOrderSubmit}
                   />
                </div>
             </form>
          </div>
       </section>
   );
};

export default CheckoutArea;