import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerHeader from './managerHeader';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/completed');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching completed orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5555/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
        <ManagerHeader />
     
      <div className="-1 ml-96 p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Completed Orders</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center">No completed orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-green-300 shadow-md rounded-lg">
              <thead className="bg-green-100">
                <tr>
                  
                  <th className="border border-green-300 px-4 py-2">Customer Name</th>
                  <th className="border border-green-300 px-4 py-2">Items</th>
                  <th className="border border-green-300 px-4 py-2">Total Price</th>
                  
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-100 transition duration-200">
                    
                    <td className="border border-green-300 px-4 py-2">{order.customerInfo.name}</td>
                    <td className="border border-green-300 px-4 py-2">
                      {order.items.map(item => (
                        <div key={item._id}>{item.name} (x{item.quantity})</div>
                      ))}
                    </td>
                    <td className="border border-green-300 px-4 py-2">
                      {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} LKR
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

export default CompletedOrders;
