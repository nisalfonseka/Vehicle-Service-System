import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Checkout({ cart, setCart }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUserProfile(loggedInUser);
    } else {
      console.error('User is not logged in or user data is missing.');
    }
  }, []);

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      if (!userProfile?.userId) throw new Error('User ID is not available.');

      const orderData = {
        customerInfo,
        items: cart.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        paymentInfo,
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
        userId: userProfile.userId
      };

      await axios.post(`http://localhost:5555/api/orders/${userProfile.userId}`, orderData);
      setCart([]);
      alert('Order placed successfully!');

      if (window.confirm('Would you like to download the order report?')) {
        generateReport(orderData);
      }

      navigate('/store');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/cart');
  };

  const validateInputs = () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone || !customerInfo.email) {
      setError('Please fill in all customer information fields.');
      return false;
    }
    if (!paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.cvv) {
      setError('Please fill in all payment information fields.');
      return false;
    }
    if (!/^\d{12}$/.test(paymentInfo.cardNumber)) {
      setError('Please enter a valid card number.');
      return false;
    }
    setError('');
    return true;
  };

  const generateReport = (orderData) => {
    const doc = new jsPDF();

    doc.text('Order Report', 14, 20);
    doc.text('Customer Information:', 14, 30);
    doc.text(`Name: ${orderData.customerInfo.name}`, 14, 36);
    doc.text(`Address: ${orderData.customerInfo.address}`, 14, 42);
    doc.text(`Phone: ${orderData.customerInfo.phone}`, 14, 48);
    doc.text(`Email: ${orderData.customerInfo.email}`, 14, 54);

    doc.text('Order Summary:', 14, 92);
    doc.autoTable({
      startY: 98,
      head: [['Item', 'Quantity', 'Price']],
      body: orderData.items.map(item => [item.name, item.quantity, `LKR ${item.price.toFixed(2)}`])
    });

    doc.text(`Total Amount: LKR ${orderData.totalAmount}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save(`order_${Date.now()}.pdf`);
  };

  // Validation event handlers
  const handleNameChange = (e) => {
    const regex = /^[A-Za-z\s]*$/; // Only allow letters and spaces
    if (regex.test(e.target.value)) {
      setCustomerInfo({ ...customerInfo, name: e.target.value });
    }
  };

  const handlePhoneChange = (e) => {
    const regex = /^\d{0,10}$/; // Only allow numbers and max length of 10
    if (regex.test(e.target.value)) {
      setCustomerInfo({ ...customerInfo, phone: e.target.value });
    }
  };

  const handleCardNumberChange = (e) => {
    const regex = /^\d{0,12}$/; // Only allow numbers and max length of 12
    if (regex.test(e.target.value)) {
      setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value });
    }
  };

  const handleCvvChange = (e) => {
    const regex = /^\d{0,3}$/; // Only allow numbers and max length of 3
    if (regex.test(e.target.value)) {
      setPaymentInfo({ ...paymentInfo, cvv: e.target.value });
    }
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2); // Insert '/' after MM
    }
    
    if (value.length === 5) {
      const month = parseInt(value.slice(0, 2));
      const year = parseInt('20' + value.slice(3, 5));
  
      if (month < 1 || month > 12) {
        setError('Invalid month. Please enter a valid expiration date.');
        return;
      }
      if (year < 2024 || year > 2028) {
        setError('Invalid year. Please enter a year between 2024 and 2028.');
        return;
      }
      
      setError(''); // Clear any previous error if the date is valid
    }
    
    setPaymentInfo({ ...paymentInfo, expirationDate: value });
  };

  return (
    <div className="custom-checkout container mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="custom-title text-4xl font-extrabold text-center text-gray-900 mb-10">Checkout</h2>

      {/* Customer Information */}
      <div className="custom-customer-info bg-gray-100 shadow-md rounded-lg p-8 mb-8">
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Customer Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Name"
            value={customerInfo.name}
            onChange={handleNameChange}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Phone"
            value={customerInfo.phone}
            onChange={handlePhoneChange}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Payment Information */}
      <div className="custom-payment-info bg-gray-100 shadow-md rounded-lg p-8 mb-8">
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handleCardNumberChange}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            value={paymentInfo.expirationDate}
            onChange={handleExpirationDateChange}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <input
            type="text"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handleCvvChange}
            className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="custom-order-summary bg-gray-100 shadow-md rounded-lg p-8 mb-8">
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h4>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {item.name} - Quantity: {item.quantity} - Price: LKR {item.price}
            </li>
          ))}
        </ul>
        <div className="font-bold text-lg mt-4">
          Total: LKR {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </div>
      </div>

      {/* Buttons */}
      <div className="custom-buttons flex justify-end gap-4">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Checkout;
