import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagerHeader from '../../components/managerHeader';

function SalesSummary() {
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [canceledOrders, setCanceledOrders] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/orders');
                const orders = response.data;
                setOrders(orders);

                // Calculate total revenue
                const revenue = orders
                    .filter(order => order.status === 'Completed')
                    .reduce((total, order) => total + order.items.reduce((sum, item) => sum + item.price * item.quantity, 0), 0);
                setTotalRevenue(revenue.toFixed(2));

                // Count orders by status
                const pending = orders.filter(order => order.status === 'Pending').length;
                const completed = orders.filter(order => order.status === 'Completed').length;
                const canceled = orders.filter(order => order.status === 'Cancelled').length;

                setPendingOrders(pending);
                setCompletedOrders(completed);
                setCanceledOrders(canceled);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <ManagerHeader />
            <div className="ml-64 p-6">
                <h2 className="text-3xl font-bold mb-6">Online Sales Summary</h2>
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Total Revenue Card */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-700">Total Revenue</h3>
                        <p className="text-4xl font-bold text-green-600">LKR {totalRevenue}</p>
                    </div>
                    
                    {/* Pending Orders Card */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-700">Pending Orders</h3>
                        <p className="text-4xl font-bold text-yellow-600">{pendingOrders}</p>
                    </div>

                    {/* Completed Orders Card */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-700">Completed Orders</h3>
                        <p className="text-4xl font-bold text-green-600">{completedOrders}</p>
                    </div>

                    {/* Canceled Orders Card */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-700">Canceled Orders</h3>
                        <p className="text-4xl font-bold text-red-600">{canceledOrders}</p>
                    </div>
                </div>

                {/* Orders Breakdown Table */}
                <h3 className="text-2xl font-bold mb-4">Orders Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left">Order ID</th>
                                <th className="py-3 px-4 text-left">Customer Name</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b">{order._id}</td>
                                    <td className="py-3 px-4 border-b">{order.customerInfo.name}</td>
                                    <td className="py-3 px-4 border-b">
                                        <span className={`px-2 py-1 rounded-lg text-white ${order.status === 'Completed' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        LKR: {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesSummary;
