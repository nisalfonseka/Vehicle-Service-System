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
  const [userProfile, setUserProfile] = useState(null); // Store user profile details
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user's information
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log("Logged In User:", loggedInUser); // Verify the structure and field names

    if (loggedInUser) {
      setUserProfile(loggedInUser); // Set user profile with the logged-in user details
      console.log("User Profile Set:", loggedInUser); // Log user profile
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
        userId: userProfile.userId // Use the user ID here
      };

      console.log('Order Data:', orderData);

      await axios.post(`http://localhost:5555/api/orders/${userProfile.userId}`, orderData); // Use the userId in the URL
      setCart([]);
      alert('Order placed successfully!');

      // Prompt the user to download the report
      const downloadReport = window.confirm('Would you like to download the order report?');

      if (downloadReport) {
        generateReport(orderData);
      }

      navigate('/store'); // Navigate to store or another route after successful order
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/cart'); // Navigate back to the cart
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
    if (!/^\d{12}$/.test(paymentInfo.cardNumber)) { // Example validation for card number
      setError('Please enter a valid card number.');
      return false;
    }
    setError('');
    return true;
  };

  const generateReport = (orderData) => {
    const doc = new jsPDF();

    doc.text('Order Report', 14, 20);

    // Customer Info
    doc.text('Customer Information:', 14, 30);
    doc.text(`Name: ${orderData.customerInfo.name}`, 14, 36);
    doc.text(`Address: ${orderData.customerInfo.address}`, 14, 42);
    doc.text(`Phone: ${orderData.customerInfo.phone}`, 14, 48);
    doc.text(`Email: ${orderData.customerInfo.email}`, 14, 54);

    // Order Summary
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
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold mb-4">Customer Information</h4>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-xl font-semibold mb-4">Payment Information</h4>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Expiration Date (MM/YY)"
            value={paymentInfo.expirationDate}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
        <ul className="space-y-2">
          {cart.map(item => (
            <li key={item._id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>LKR {item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="font-semibold mt-4">Total: LKR {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
        <button
          onClick={handleCancel}
          className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Checkout;
