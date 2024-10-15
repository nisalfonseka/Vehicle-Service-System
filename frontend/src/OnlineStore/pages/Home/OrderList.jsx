import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagerHeader from '../../components/managerHeader';
import { FaSearch } from 'react-icons/fa';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/orders?status=Pending');
                setOrders(response.data);
                setFilteredOrders(response.data); // Initialize filtered orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const result = orders.filter(order => 
            order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOrders(result);
    }, [searchQuery, orders]);

    const handleDetails = (orderId) => {
        window.location.href = `/orders/${orderId}`;
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-600';
            case 'pending':
                return 'bg-yellow-100 text-yellow-600';
            case 'cancelled':
                return 'bg-red-100 text-red-600';
            default:
                return '';
        }
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <ManagerHeader />
            <div className="-1 ml-64 p-6">
                <h2 className="text-3xl font-bold mb-4">All Orders</h2>
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Customer Name"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>
                {filteredOrders.length === 0 ? (
                    <p className="text-gray-600">No orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    
                                    <th className="py-3 px-4 text-left">Customer Name</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Items</th>
                                    <th className="py-3 px-4 text-left">Total Price</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order._id} className={`hover:bg-gray-100 ${getStatusClass(order.status)}`}>
                                        
                                        <td className="py-3 px-4 border-b">{order.customerInfo.name}</td>
                                        <td className="py-3 px-4 border-b">{order.status}</td>
                                        <td className="py-3 px-4 border-b">
                                            {order.items.map(item => (
                                                <div key={item._id}>
                                                    {item.name} x {item.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            LKR: {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 border-b">
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200" onClick={() => handleDetails(order._id)}>
                                                See Details
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
}

export default OrderList;
