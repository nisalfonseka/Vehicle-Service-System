import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Failed to load order details. Please try again.');
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "8b920bf8-7c7b-46f8-8b89-29847a488297");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    const handleClear = () => {
        setResult("");
        document.getElementById("order-form").reset();
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleAccept = async () => {
        try {
            await axios.put(`http://localhost:5555/api/orders/${orderId}`, { status: 'Completed' });
            setOrder(prevOrder => ({ ...prevOrder, status: 'Completed' }));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleCancel = async () => {
        try {
            await axios.put(`http://localhost:5555/api/orders/${orderId}`, { status: 'Cancelled' });
            setOrder(prevOrder => ({ ...prevOrder, status: 'Cancelled' }));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleDelete = async () => {
            const response = await axios.delete(`http://localhost:5555/api/orders/${orderId}`);
            if (response.status === 200) {
                handleBack();
            }     
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor('#007BFF');
        doc.text('Order Report', 14, 22);

        doc.setFontSize(12);
        doc.setTextColor('#333');
        doc.text(`Order ID: ${order._id}`, 14, 32);
        doc.text(`Customer Name: ${order.customerInfo.name}`, 14, 40);
        doc.text(`Customer Address: ${order.customerInfo.address}`, 14, 48);
        doc.text(`Customer Phone: ${order.customerInfo.phone}`, 14, 56);
        doc.text(`Email: ${order.customerInfo.email}`, 14, 64);
        doc.text(`Status: ${order.status}`, 14, 72);

        const items = order.items.map(item => [
            item.name,
            item.quantity,
            `LKR ${item.price.toFixed(2)}`
        ]);

        doc.autoTable({
            startY: 80,
            head: [['Item Name', 'Quantity', 'Price']],
            body: items,
            styles: {
                fillColor: [41, 128, 185],
                textColor: 255,
            },
        });

        const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        doc.text(`Total Price: LKR ${totalPrice}`, 14, doc.autoTable.previous.finalY + 10);

        doc.save('Order_Report.pdf');
    };

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (!order) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <button
                className="flex items-center text-blue-500 hover:text-blue-700 font-semibold mb-4"
                onClick={handleBack}
            >
                <i className="bi bi-arrow-left text-lg mr-2"></i>
                <span>Back</span>
            </button>
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Order Details</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
                    <h4 className="text-xl font-semibold text-blue-700 mb-4">Order Information</h4>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Customer Name:</strong> {order.customerInfo.name}</p>
                    <p><strong>Customer Address:</strong> {order.customerInfo.address}</p>
                    <p><strong>Customer Phone:</strong> {order.customerInfo.phone}</p>
                    <p><strong>Email:</strong> {order.customerInfo.email}</p>
                    <p><strong>Status:</strong> <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : order.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                    <h5 className="text-lg font-semibold text-blue-600 mt-4">Items:</h5>
                    <ul className="list-disc ml-5">
                        {order.items.map(item => (
                            <li key={item._id} className="text-blue-900">
                                {item.name} x {item.quantity} - LKR {item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-blue-900"><strong>Total Price:</strong> LKR {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                    <div className="flex justify-between mt-6">
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleAccept}>Accept</button>
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleCancel}>Cancel</button>
                        <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={handleDelete}>Delete</button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleDownloadReport}>Download Report</button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
                    <h4 className="text-xl font-semibold text-blue-700 mb-4">Send Us a Message</h4>
                    <form id="order-form" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                            <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea id="message" name="message" rows="4" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Send</button>
                            <button type="button" onClick={handleClear} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">Clear</button>
                        </div>
                        <div className="mt-4">
                            <p className="text-green-600">{result}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
