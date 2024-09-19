import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(''); // State to store userId
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user's information
    const fetchUserProfile = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      console.log("Logged In User:", loggedInUser); // Verify the structure and field names

      if (loggedInUser && loggedInUser.userId) {
        setUserId(loggedInUser.userId); // Set userId from user profile
        console.log("User Profile Set:", loggedInUser); // Log user profile
      } else {
        console.error('User is not logged in or user data is missing.');
        setError('User is not logged in or user data is missing.');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!userId) return; // Don't fetch orders if userId is not available

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/api/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleBack = () => {
    navigate('/store'); // Navigate back to the store page
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          &larr; Back to Store
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {orders.map((order) => (
            <div key={order._id} className="border-b border-gray-200 mb-4 pb-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Amount:</strong> LKR {order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</p>
              <h4 className="text-md font-semibold mt-2">Items:</h4>
              <ul>
                {order.items.map(item => (
                  <li key={item._id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>LKR {item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <p><strong>Customer Information:</strong></p>
                <p>Name: {order.customerInfo.name}</p>
                <p>Address: {order.customerInfo.address}</p>
                <p>Phone: {order.customerInfo.phone}</p>
                <p>Email: {order.customerInfo.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
