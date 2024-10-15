import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MyOrderReport from './MyOrderReport'; // Assuming you named your styled report component MyOrderReport
import { pdf } from '@react-pdf/renderer'; // Importing pdf from react-pdf


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
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUserProfile(loggedInUser);
      fetchCards(loggedInUser.userId); // Fetch cards when user is logged in
    } else {
      console.error('User is not logged in or user data is missing.');
    }
  }, []);

  const fetchCards = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5555/api/cards/${userId}`);
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setLoading(false);
    }
  };

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
  
      // Send order data to the server
      await axios.post(`http://localhost:5555/api/orders/${userProfile.userId}`, orderData);
      setCart([]);
      alert('Order placed successfully!');
  
      // Automatically download MyOrderReport when user confirms
      if (window.confirm('Would you like to download the order report?')) {
        const pdfBlob = await pdf(<MyOrderReport order={orderData} />).toBlob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `order_${Date.now()}.pdf`;
        link.click();
      }
  
      // Navigate to store after placing the order
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

  // Autofill payment info when card is selected
  const handleCardSelect = (card) => {
    setPaymentInfo({
      cardNumber: card.cardNumber,
      expirationDate: card.expirationDate,
      cvv: card.cvv
    });
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

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

        // Check for invalid month
        if (month < 1 || month > 12) {
            setError('Invalid month. Please enter a valid expiration date.');
            return;
        }
        
        // Check for invalid year
        if (year < currentYear || year > currentYear + 4) {
            setError('Invalid year. Please enter a year between ' + currentYear + ' and ' + (currentYear + 4) + '.');
            return;
        }

        // Check for expiration based on current month
        if (year === currentYear && month < currentMonth) {
            setError('Expired date. Please enter a valid expiration date.');
            return;
        }

        setError(''); // Clear any previous error if the date is valid
    }

    setPaymentInfo({ ...paymentInfo, expirationDate: value });
};
  // Clear payment information fields
  const handleClear = () => {
    setPaymentInfo({
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    });
    setError(''); // Clear any error messages
  };

  return (
    <div className="custom-checkout container1 mx-auto px-4 py-12">
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
  onChange={(e) => {
    const email = e.target.value;
    const regex = /^[a-zA-Z0-9@.]*$/; // Allow only letters, numbers, @ and .
    if (regex.test(email)) {
      setCustomerInfo({ ...customerInfo, email });
    }
  }}
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

        {loading ? (
          <div className="text-center">Loading cards...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select onChange={(e) => handleCardSelect(JSON.parse(e.target.value))} className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg">
              <option value="">Select a Card</option>
              {cards.map((card, index) => (
                <option key={index} value={JSON.stringify(card)}>
                  {card.cardNumber} - Exp: {card.expirationDate}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Card Number"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentInfo.expirationDate}
              onChange={handleExpirationDateChange}
              className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
            <input
              type="password"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={handleCvvChange}
              className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        )}
        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
        <button
          onClick={handleClear}
          className="custom-clear-button mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          Clear Payment Details
        </button>
      </div>

      {/* Order Summary */}
      <div className="custom-order-summary bg-gray-100 shadow-md rounded-lg p-8">
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h4>
        <ul>
          {cart.map(item => (
            <li key={item._id} className="flex justify-between mb-4">
              <span>{item.name} (x{item.quantity})</span>
              <span>LKR {item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="font-bold text-xl">Total: LKR {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleCancel}
          className="custom-cancel-button px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="custom-submit-button px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
