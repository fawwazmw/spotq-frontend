import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useCartInfo from '../../hooks/use-cart-info';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import useAuth from '../../hooks/useAuth';

const Order = ({ formData, setFormData, handleOrderSubmit }) => {
   const { user } = useAuth();
   const cartItems = useSelector((state) => state.products.addToCart);
   const cartTotal = useSelector((state) => state.products.cartTotalAmount);
   const { total } = useCartInfo();
   const router = useRouter();

   const [orderReceipt, setOrderReceipt] = React.useState(null);

   const handleRoomChange = (e) => {
      setFormData({
         ...formData,
         roomId: e.target.value,
      });
   };

   const handleDateTimeChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handlePlaceOrder = () => {
      const cafeName = cartItems[0]?.title || "Default Cafe Name";

      const orderData = {
         data: {
            fullname: user?.username || formData.fullName,
            email_address: user?.email || formData.email,
            street_address: formData.address?.street_address,
            town_city: formData.address?.town_city,
            state_country: formData.address?.state_country,
            postcode_zip: formData.address?.postcode_zip,
            telephone_number: formData.phone,
            room_name: formData.roomId,
            start_date: new Date(formData.startDate).toISOString(),
            end_date: new Date(formData.endDate).toISOString(),
            cafe_name: cafeName,
            booking_status: formData.status || 'pending',
         }
      };

      console.log('Order Data to be sent:', orderData);

      try {
         axios.post('http://localhost:1337/api/bookeds', orderData)
             .then((response) => {
                console.log('Order placed successfully:', response);

                // Format dates
                const startDate = new Date(formData.startDate).toLocaleString();
                const endDate = new Date(formData.endDate).toLocaleString();

                // Set the order receipt details here
                const receipt = {
                   id: response.data.data.id,
                   fullName: user?.username || formData.fullName,
                   email: user?.email || formData.email,
                   cafeName: cafeName,
                   totalAmount: total,
                   date: startDate,
                   endDate: endDate,
                   orderItems: cartItems.map(item => ({
                      name: item.title,
                      quantity: item.cartQuantity,
                      price: item.price * item.cartQuantity
                   })),
                   status: 'pending'  // Gunakan status default
                };

                setOrderReceipt(receipt);

                // Show SweetAlert with order details and download button
                Swal.fire({
                   title: 'Order Placed Successfully',
                   html: `
                   <strong>Order ID:</strong> ${generateOrderID()}<br>
                   <strong>Full Name:</strong> ${receipt.fullName}<br>
                   <strong>Email:</strong> ${receipt.email}<br>
                   <strong>Cafe:</strong> ${receipt.cafeName}<br>
                   <strong>Total:</strong> Rp ${receipt.totalAmount}<br>
                   <strong>Status:</strong> ${receipt.status}<br>
                   <strong>Start Date:</strong> ${receipt.date}<br>
                   <strong>End Date:</strong> ${receipt.endDate}<br>
                   <strong>Items:</strong><br>
                   ${receipt.orderItems.map(item => `${item.name} x ${item.quantity} - Rp ${item.price}`).join('<br>')}
                `,
                   icon: 'success',
                   showCancelButton: true,
                   cancelButtonText: 'Close',
                   confirmButtonText: 'Download Receipt',
                   reverseButtons: true,
                   preConfirm: () => {
                      handleDownloadReceipt(receipt);
                   }
                }).then((result) => {
                   if (!result.isConfirmed) {
                      window.location.href = '/';
                   }
                });
             })
             .catch((error) => {
                console.error('Error placing order:', error.response ? error.response.data : error.message);
                Swal.fire({
                   icon: 'error',
                   title: 'Order Failed',
                   text: 'There was an error placing your order. Please try again.',
                });
             });
      } catch (error) {
         console.error('Error sending order request:', error.message);
         Swal.fire({
            icon: 'error',
            title: 'Order Failed',
            text: 'There was an error sending your order request. Please try again.',
         });
      }
   };

   // Fungsi untuk menghasilkan Order ID acak
   const generateOrderID = () => {
      // Menghasilkan UUID acak menggunakan timestamp dan random string
      return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
   };

   const handleDownloadReceipt = (receipt) => {
      // Membuat dokumen PDF baru
      const doc = new jsPDF();

      // Set font default
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);

      // Menambahkan background warna biru untuk seluruh halaman
      doc.setFillColor(0, 123, 255);
      doc.rect(0, 0, 210, 297, 'F');

      // Menambahkan header yang jelas dengan teks putih
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('Order Receipt', 105, 20, { align: 'center' });

      // Membuat Order ID secara otomatis
      const orderID = generateOrderID();

      // Menambahkan informasi order yang dikirimkan
      doc.setFontSize(14);
      doc.text(`Order ID: ${orderID}`, 15, 50);
      doc.text(`Full Name: ${receipt.fullName}`, 15, 60);      // Gunakan dari receipt
      doc.text(`Email: ${receipt.email}`, 15, 70);             // Gunakan dari receipt
      doc.text(`Cafe: ${receipt.cafeName}`, 15, 80);
      doc.text(`Total: Rp ${receipt.totalAmount}`, 15, 90);
      doc.text(`Status: ${receipt.status}`, 15, 100);
      doc.text(`Start Date: ${receipt.date}`, 15, 110);
      doc.text(`End Date: ${receipt.endDate}`, 15, 120);  // Tambahkan End Date

      // Menambahkan bagian daftar item
      let startY = 130;  // Sesuaikan posisi Y untuk daftar item
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text('Items:', 15, startY);

      // Gambar tabel dengan border
      const rowHeight = 10;
      const tableStartY = startY + 10;
      doc.setLineWidth(0.5);
      doc.rect(10, tableStartY - 5, 190, rowHeight + receipt.orderItems.length * rowHeight);

      // Header kolom untuk tabel
      doc.text("Item Name", 15, tableStartY);
      doc.text("Quantity", 140, tableStartY);
      doc.text("Price", 170, tableStartY);

      // Gambar tabel item
      receipt.orderItems.forEach((item, index) => {
         const y = tableStartY + (index + 1) * rowHeight;
         doc.text(item.name, 15, y);
         doc.text(item.quantity.toString(), 140, y, { align: 'center' });
         doc.text(`Rp ${item.price}`, 170, y, { align: 'right' });
         doc.line(10, y + 1, 200, y + 1);
      });

      const filename = `order_${orderID}_receipt.pdf`;
      doc.save(filename);

      window.location.href = '/';
   };


   // Update fungsi showSweetAlert
   const showSweetAlert = (receipt) => {
      const orderID = generateOrderID();

      Swal.fire({
         title: 'Thank you for your order!',
         html: `
         <strong>Order ID:</strong> ${orderID}<br>
         <strong>Full Name:</strong> ${receipt.fullName}<br>    
         <strong>Email:</strong> ${receipt.email}<br>           
         <strong>Cafe:</strong> ${receipt.cafeName}<br>
         <strong>Total:</strong> Rp ${receipt.totalAmount}<br>
         <strong>Status:</strong> ${receipt.status}<br>
         <strong>Start Date:</strong> ${receipt.date}<br>
         <strong>End Date:</strong> ${receipt.endDate}<br>      
         <strong>Items:</strong><br>
         ${receipt.orderItems.map(item => `${item.name} x ${item.quantity} - Rp ${item.price}`).join('<br>')}
      `,
         icon: 'success',
         confirmButtonText: 'Download Receipt',
         showCancelButton: true,
         cancelButtonText: 'OK'
      }).then((result) => {
         if (result.isConfirmed) {
            handleDownloadReceipt(receipt);
         } else {
            window.location.href = '/';
         }
      });
   };

   const uniqueCategories = [...new Set(cartItems.map((item) => item.category))];

   return (
       <div className="col-lg-6">
          <div className="your-order mb-30">
             <h3>Your Order</h3>
             <div className="your-order-table table-responsive">
                <table>
                   <thead>
                   <tr>
                      <th className="product-name">Product</th>
                      <th className="product-total text-center">Total</th>
                   </tr>
                   </thead>
                   <tbody className="border-0">
                   {cartItems.map((cart, index) => (
                       <tr key={index} className="cart_item">
                          <td className="product-name">
                             {cart.title} <strong className="product-quantity"> × {cart.cartQuantity}</strong>
                          </td>
                          <td className="product-total text-center">
                             <span className="amount">Rp {cart.price * cart.cartQuantity}</span>
                          </td>
                       </tr>
                   ))}
                   </tbody>

                   <tfoot>
                   <tr className="order-total">
                      <th>Subtotal</th>
                      <td className="text-center">
                         <strong>
                            <span className="amount">Rp {total}</span>
                         </strong>
                      </td>
                   </tr>
                   <tr className="order-total">
                      <th>Total</th>
                      <td className="text-center">
                         <strong>
                            <span className="amount">Rp {total}</span>
                         </strong>
                      </td>
                   </tr>
                   </tfoot>
                </table>
             </div>

             <div className="form-group mb-3">
                <label className="mb-3">Select Room</label>
                <select
                    name="room"
                    className="form-control"
                    onChange={handleRoomChange}
                    value={formData.roomId || ''}
                >
                   <option value="">-- Select Room --</option>
                   {uniqueCategories.map((category, index) => (
                       <option key={index} value={category}>
                          {category}
                       </option>
                   ))}
                </select>
             </div>

             <div className="form-group mb-3">
                <label className="mb-3">Start Date and Time</label>
                <input
                    type="datetime-local"
                    name="startDate"
                    className="form-control"
                    value={formData.startDate || ''}
                    onChange={handleDateTimeChange}
                    required
                />
             </div>

             <div className="form-group mb-4">
                <label className="mb-3">End Date and Time</label>
                <input
                    type="datetime-local"
                    name="endDate"
                    className="form-control"
                    value={formData.endDate || ''}
                    onChange={handleDateTimeChange}
                    required
                />
             </div>

             <div className="order-button-payment mt-20">
                <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="m-btn m-btn-border-2 cta__btn active"
                >
                   Place Order
                </button>
             </div>
          </div>

          {orderReceipt && (
              <div className="order-receipt mt-30">
                 <h3>Order Receipt</h3>
                 <pre>
                   {`Order ID: ${orderReceipt.id}\nCafe: ${orderReceipt.cafeName}\nTotal: Rp ${orderReceipt.totalAmount}\nStatus: ${orderReceipt.status}\nDate: ${orderReceipt.date}\n\nItems:\n${orderReceipt.orderItems.map(item => `${item.name} - ${item.quantity} x Rp ${item.price}`).join('\n')}`}
                </pre>
                 <button onClick={handleDownloadReceipt} className="m-btn m-btn-border-2 cta__btn">
                    Download Receipt
                 </button>
              </div>
          )}
       </div>
   );
};

export default Order;