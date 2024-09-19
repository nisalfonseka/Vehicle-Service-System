import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagerHeader from '../../components/managerHeader';



function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5555/api/orders?status=Pending');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDetails = (orderId) => {
        window.location.href = `/orders/${orderId}`;
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'table-success';
            case 'pending':
                return 'table-warning';
            case 'cancelled':
                return 'table-danger';
            default:
                return '';
        }
    };

    return (
        <div className='flex'>
            <ManagerHeader />
            <div className="container mt-4">
                <h2 className="mb-4">All Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className={getStatusClass(order.status)}>
                                        <td>{order._id}</td>
                                        <td>{order.customerInfo.name}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            {order.items.map(item => (
                                                <div key={item._id}>
                                                    {item.name} x {item.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td>LKR: {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleDetails(order._id)}>See Details</button>
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
