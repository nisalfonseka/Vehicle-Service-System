import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../FinanceManagement/Navbar';
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
        window.location.href = `/dashboard/finance/summery/${orderId}`;
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
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <Navbar/>
            <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold mb-4 text-center">Ashan Auto Service</h1>
            <h3 className="text-2xl text-[#0a2f56]" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            Invoice List
        </h3>
                <div className="mb-6">
                    <div className="relative w-full max-w-lg mx-auto">
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            className="w-full p-2 border border-[#0a2f56] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#0a2f56]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>
                {filteredOrders.length === 0 ? (
                    <p className="text-gray-600 text-center">No orders found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrders.map(order => (
                            <div
                                key={order._id}
                                className={`p-6 bg-white shadow-md rounded-lg border border-gray-300 hover:bg-gray-100 transition ${getStatusClass(order.status)}`}
                            >
                                <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
                                <p className="mb-2"><strong>Customer Name:</strong> {order.customerInfo.name}</p>
                                <p className="mb-2"><strong>Status:</strong> {order.status}</p>
                                <div className="mb-2">
                                    <strong>Items:</strong>
                                    <ul className="list-disc pl-5">
                                        {order.items.map(item => (
                                            <li key={item._id}>
                                                {item.name} x {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="mb-4"><strong>Total Price:</strong> LKR: {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                    onClick={() => handleDetails(order._id)}
                                >
                                    See Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderList;
