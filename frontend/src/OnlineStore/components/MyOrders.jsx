import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser && loggedInUser.userId) {
        setUserId(loggedInUser.userId);
      } else {
        setError('User is not logged in or user data is missing.');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/api/user/${userId}`);
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
    navigate('/store');
  };

  // Function to calculate total amount for each order
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-600"><strong>Status:</strong> {order.status}</p>
              <p className="text-gray-600"><strong>Total Amount:</strong> LKR {calculateTotalAmount(order.items)}</p>
              <h4 className="text-md font-semibold mt-2">Items:</h4>
              <ul className="list-disc pl-5">
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
        !loading && <p className="text-center">No orders found.</p>
      )}
    </div>
  );
}

export default MyOrders;
