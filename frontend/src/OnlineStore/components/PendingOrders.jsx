import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerHeader from './managerHeader';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/pending');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5555/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      // Optionally display an error message here
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="mt-52 mb-12"> {/* Adjusted bottom margin for better layout */}
        <ManagerHeader />
      </div>

      <div className="ml-64 p-6 flex-grow"> {/* Fixed class for margin-left */}
        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">Pending Orders</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center">No pending orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-yellow-300 shadow-md rounded-lg">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="border border-yellow-300 px-4 py-2">Order ID</th>
                  <th className="border border-yellow-300 px-4 py-2">Customer Name</th>
                  <th className="border border-yellow-300 px-4 py-2">Items</th>
                  <th className="border border-yellow-300 px-4 py-2">Total Price</th>
                  <th className="border border-yellow-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-100 transition duration-200">
                    <td className="border border-yellow-300 px-4 py-2">{order._id}</td>
                    <td className="border border-yellow-300 px-4 py-2">{order.customerInfo.name}</td>
                    <td className="border border-yellow-300 px-4 py-2">
                      {order.items.map(item => (
                        <div key={item._id}>{item.name} (x{item.quantity})</div>
                      ))}
                    </td>
                    <td className="border border-yellow-300 px-4 py-2">
                      {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} LKR
                    </td>
                    <td className="border border-yellow-300 px-4 py-2">
                      <button
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-200"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
