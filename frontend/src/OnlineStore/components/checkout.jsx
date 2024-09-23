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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Checkout</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h4 className="text-2xl font-semibold mb-4">Customer Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['name', 'address', 'phone', 'email'].map((field, index) => (
            <input
              key={index}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={customerInfo[field]}
              onChange={(e) => setCustomerInfo({ ...customerInfo, [field]: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h4 className="text-2xl font-semibold mb-4">Payment Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['cardNumber', 'expirationDate', 'cvv'].map((field, index) => (
            <input
              key={index}
              type="text"
              placeholder={field === 'expirationDate' ? 'Expiration Date (MM/YY)' : field.charAt(0).toUpperCase() + field.slice(1)}
              value={paymentInfo[field]}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, [field]: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h4 className="text-2xl font-semibold mb-4">Order Summary</h4>
        <ul className="space-y-2">
          {cart.map(item => (
            <li key={item._id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>LKR {item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="font-semibold mt-4">Total: LKR {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition duration-200"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Checkout;
