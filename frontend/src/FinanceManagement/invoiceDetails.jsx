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
        
        // Get the customer's email from the form input
        const email = formData.get('email');
        
        // Prepare order details to be sent in the email
        const orderDetails = {
            orderId: order._id,
            customerName: order.customerInfo.name,
            customerAddress: order.customerInfo.address,
            customerPhone: order.customerInfo.phone,
            items: order.items,
            totalPrice: order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
        };
    
        // Generate PDF report as base64 string
        const pdfBase64 = generatePDFReport(orderDetails);
        
        // Send email with order details
        try {
            const emailResponse = await axios.post('http://localhost:5555/incomeRequests/send-email', {
                to: email,
                subject: `Order Details for Order ID: ${order._id}`,
                message: formData.get('message'),
                attachment: {
                    filename: 'Order_Report.pdf',
                    content: pdfBase64,
                },
            });
            setResult("Form Submitted Successfully");
            event.target.reset();
        } catch (error) {
            console.log("Error", error);
            setResult("Failed to send email.");
        }
    };
    
    

    const handleClear = () => {
        setResult("");
        document.getElementById("order-form").reset();
    };

    const handleBack = () => {
        window.history.back();
    };

   
// Function to generate PDF as base64 string
const generatePDFReport = (orderDetails) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor('#007BFF');
    doc.text('Order Report', 14, 22);

    doc.setFontSize(12);
    doc.setTextColor('#333');
    doc.text(`Order ID: ${orderDetails.orderId}`, 14, 32);
    doc.text(`Customer Name: ${orderDetails.customerName}`, 14, 40);
    doc.text(`Customer Address: ${orderDetails.customerAddress}`, 14, 48);
    doc.text(`Customer Phone: ${orderDetails.customerPhone}`, 14, 56);
    doc.text(`Total Price: LKR ${orderDetails.totalPrice}`, 14, 64);

    const items = orderDetails.items.map(item => [
        item.name,
        item.quantity,
        `LKR ${item.price.toFixed(2)}`,
    ]);

    doc.autoTable({
        startY: 80,
        head: [['Item Name', 'Quantity', 'Price']],
        body: items,
        theme: 'grid', // Optional: to add borders to the cells
        headStyles: {
            fillColor: [34, 49, 63], // Dark background for header
            textColor: 255, // White text color for header
            fontStyle: 'bold', // Bold text for header
        },
        styles: {
            fillColor: [255, 255, 255], // White background for body
            textColor: [0, 0, 0], // Black text color for body
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240], // Light gray for alternate rows
        },
    });
    

    // Generate the PDF as a base64 string
    const pdfOutput = doc.output('datauristring');
    return pdfOutput.split(',')[1]; // Return only the base64 part
};

// Separate function to handle report download
const handleDownloadReport = () => {
    if (!order) return; // Ensure order data is available
    const orderDetails = {
        orderId: order._id,
        customerName: order.customerInfo.name,
        customerAddress: order.customerInfo.address,
        customerPhone: order.customerInfo.phone,
        items: order.items,
        totalPrice: order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    };
    
    const pdfBase64 = generatePDFReport(orderDetails);
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${pdfBase64}`;
    link.download = 'Order_Report.pdf';
    link.click();
};

    if (error) {
        return <p className="text-red-600 font-bold text-lg">{error}</p>;
    }

    if (!order) {
        return <p className="text-gray-500">Loading order details...</p>;
    }

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
            <button
                className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6"
                onClick={handleBack}
            >
                <i className="bi bi-arrow-left text-lg mr-2"></i>
                <span>Back</span>
            </button>
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Invoice Details</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
                    <h4 className="text-2xl font-semibold text-blue-800 mb-4">Order Information</h4>
                    <p className="text-lg"><strong>Order ID:</strong> {order._id}</p>
                    <p className="text-lg"><strong>Customer Name:</strong> {order.customerInfo.name}</p>
                    <p className="text-lg"><strong>Customer Address:</strong> {order.customerInfo.address}</p>
                    <p className="text-lg"><strong>Customer Phone:</strong> {order.customerInfo.phone}</p>
                    <p className="text-lg"><strong>Email:</strong> {order.customerInfo.email}</p>
                    <p className="text-lg"><strong>Status:</strong> <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : order.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                    <h5 className="text-lg font-semibold text-blue-700 mt-4">Items:</h5>
                    <ul className="list-disc ml-5">
                        {order.items.map(item => (
                            <li key={item._id} className="text-blue-800">
                                {item.name} x {item.quantity} - LKR {item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-blue-900 text-lg"><strong>Total Price:</strong> LKR {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                    <div className="flex justify-between mt-6">
                    <button 
                        className={`py-2 px-6 rounded-lg shadow transition duration-200 ${
                            order.status === 'Completed' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        }`} 
                        onClick={handleDownloadReport} 
                        disabled={order.status !== 'Completed'} 
                    >
                        Download Report
                    </button>
                </div>

                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
                    <h4 className="text-2xl font-semibold text-blue-800 mb-4">Send Us a Message</h4>
                    <form id="order-form" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                            <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea id="message" name="message" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={handleClear} className="bg-gray-400 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-500 transition duration-200">Clear</button>
                            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200">Send Message</button>
                        </div>
                        {result && <p className="text-green-600 mt-3">{result}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
