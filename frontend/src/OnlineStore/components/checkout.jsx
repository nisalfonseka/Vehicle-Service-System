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

  return (
    <div className="custom-checkout container mx-auto px-4 py-12">
  {/* Title */}
  <h2 className="custom-title text-4xl font-extrabold text-center text-gray-900 mb-10">Checkout</h2>

  {/* Customer Information */}
  <div className="custom-customer-info bg-gray-100 shadow-md rounded-lg p-8 mb-8">
    <h4 className="text-2xl font-bold text-gray-800 mb-6">Customer Information</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['name', 'address', 'phone', 'email'].map((field, index) => (
        <input
          key={index}
          type={field === 'email' ? 'email' : 'text'}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={customerInfo[field]}
          onChange={(e) => setCustomerInfo({ ...customerInfo, [field]: e.target.value })}
          className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
      ))}
    </div>
  </div>

  {/* Payment Information */}
  <div className="custom-payment-info bg-gray-100 shadow-md rounded-lg p-8 mb-8">
    <h4 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['cardNumber', 'expirationDate', 'cvv'].map((field, index) => (
        <input
          key={index}
          type="text"
          placeholder={field === 'expirationDate' ? 'Expiration Date (MM/YY)' : field.charAt(0).toUpperCase() + field.slice(1)}
          value={paymentInfo[field]}
          onChange={(e) => setPaymentInfo({ ...paymentInfo, [field]: e.target.value })}
          className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
      ))}
    </div>
  </div>

  {/* Order Summary */}
  <div className="custom-order-summary bg-gray-100 shadow-md rounded-lg p-8 mb-8">
    <h4 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h4>
    <ul className="space-y-4">
      {cart.map(item => (
        <li key={item._id} className="flex justify-between text-lg font-medium text-gray-700">
          <span>{item.name} x {item.quantity}</span>
          <span>LKR {item.price.toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <p className="font-bold text-xl text-gray-900 mt-6">Total: LKR {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>

    {/* Action Buttons */}
    <div className="custom-buttons flex justify-between mt-8">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all duration-200"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
      <button
        onClick={handleCancel}
        className="bg-gray-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-600 transition-all duration-200"
      >
        Cancel
      </button>
    </div>
    {error && <p className="mt-6 text-red-600">{error}</p>}
  </div>
</div>


  );
}

export default Checkout;
