import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerHeader from './managerHeader';
import { FaTrashAlt } from 'react-icons/fa';

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/cancelled');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching cancelled orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5555/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      setConfirmDelete(null); // Reset confirmation
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
        <ManagerHeader />
     
      <div className="-1 ml-96 p-6" >
        <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">Cancelled Orders</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center">No cancelled orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-red-300 shadow-lg rounded-lg">
              <thead className="bg-red-100">
                <tr>
                  
                  <th className="border border-red-300 px-4 py-2">Customer Name</th>
                  <th className="border border-red-300 px-4 py-2">Items</th>
                  <th className="border border-red-300 px-4 py-2">Total Price</th>
                  
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-100 transition duration-200">
                    
                    <td className="border border-red-300 px-4 py-2">{order.customerInfo.name}</td>
                    <td className="border border-red-300 px-4 py-2">
                      {order.items.map(item => (
                        <div key={item._id}>{item.name} (x{item.quantity})</div>
                      ))}
                    </td>
                    <td className="border border-red-300 px-4 py-2">
                      {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} LKR
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 mr-2"
                onClick={() => deleteOrder(confirmDelete)}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelledOrders;
