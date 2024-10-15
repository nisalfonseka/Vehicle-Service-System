import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderReport from '../../components/OrderReport';

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

     // Email sending function
     const handleEmailSend = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        
        const formData = {
            recipientEmail: event.target.recipientEmail.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        };

        try {
            const response = await axios.post('http://localhost:5555/send-email', formData);
            if (response.data.success) {
                setResult("Email sent successfully!");
                event.target.reset();
            } else {
                setResult(response.data.message);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setResult('Failed to send email. Please try again.');
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
    
        // Set title
        doc.setFontSize(20);
        doc.setTextColor(0, 51, 102); // Dark Blue Color
        doc.text('Order Report', 14, 22);
    
        // Set order details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Black Color
        doc.text(`Order ID: ${order._id}`, 14, 32);
        doc.text(`Customer Name: ${order.customerInfo.name}`, 14, 40);
        doc.text(`Customer Address: ${order.customerInfo.address}`, 14, 48);
        doc.text(`Customer Phone: ${order.customerInfo.phone}`, 14, 56);
        doc.text(`Email: ${order.customerInfo.email}`, 14, 64);
        doc.text(`Status: ${order.status}`, 14, 72);
    
        // Prepare items data
        const items = order.items.map(item => [
            item.name,
            item.quantity,
            `LKR ${item.price.toFixed(2)}`
        ]);
    
        // Add table for items
        doc.autoTable({
            startY: 80,
            head: [['Item Name', 'Quantity', 'Price']],
            body: items,
            headStyles: {
                fillColor: [0, 123, 255], // Bootstrap Primary Color
                textColor: [255, 255, 255], // White Color
            },
            styles: {
                fillColor: [240, 240, 240], // Light Gray for table rows
                textColor: [0, 0, 0], // Black for text
            },
        });
    
        // Calculate total price and add to PDF
        const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        doc.text(`Total Price: LKR ${totalPrice}`, 14, doc.autoTable.previous.finalY + 10);
    
        // Save the PDF
        doc.save('Order_Report.pdf');
    };
    

    if (error) {
        return <p className="text-red-600 font-bold text-lg">{error}</p>;
    }

    if (!order) {
        return <p className="text-gray-500">Loading order details...</p>;
    }

    return (
        <div className="container1 mx-auto p-8 bg-white rounded-lg shadow-md m-8">
    <button
        className="flex items-center text-indigo-500 hover:text-indigo-700 font-semibold mb-6"
        onClick={handleBack}
    >
        <i className="bi bi-arrow-left text-lg mr-2"></i>
        <span>Back</span>
    </button>
    <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">Order Details</h2>
    <div className="flex flex-col md:flex-row justify-center gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full md:w-1/2">
            <h4 className="text-2xl font-semibold text-indigo-600 mb-4">Order Information</h4>
            
            <p className="text-lg text-black"><strong>Customer Name:</strong> {order.customerInfo.name}</p>
            <p className="text-lg text-black"><strong>Customer Address:</strong> {order.customerInfo.address}</p>
            <p className="text-lg text-black"><strong>Customer Phone:</strong> {order.customerInfo.phone}</p>
            <p className="text-lg text-black"><strong>Email:</strong> {order.customerInfo.email}</p>
            <p className="text-lg text-black">
                <strong>Status:</strong> 
                <span className={`font-bold ${order.status === 'Completed' ? 'text-green-500' : order.status === 'Cancelled' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {order.status}
                </span>
            </p>
            <h5 className="text-lg font-semibold text-indigo-500 mt-4">Items:</h5>
            <ul className="list-disc ml-5">
                {order.items.map(item => (
                    <li key={item._id} className="text-indigo-600">
                        {item.name} x {item.quantity} - LKR {item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <p className="mt-3 text-black text-lg"><strong>Total Price:</strong> LKR {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
            <div className="flex justify-between mt-6">
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-200" onClick={handleAccept}>Accept</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-200" onClick={handleCancel}>Cancel</button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600 transition duration-200" onClick={handleDelete}>Delete</button>


                <PDFDownloadLink
                        document={<OrderReport order={order} />}
                        fileName={`Order_Report_${order._id}.pdf`}
                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition duration-200">
                        {({ loading }) => (loading ? 'Preparing Report...' : 'Download Report')}
                </PDFDownloadLink>


            </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full md:w-1/2">
                    <h4 className="text-2xl font-semibold text-indigo-600 mb-4">Send Message To {order.customerInfo.name}</h4>
                    <form id="order-form" onSubmit={handleEmailSend}>
                        <div className="mb-4">
                            <label htmlFor="recipientEmail" className="block text-gray-700 font-bold mb-2">Recipient Email</label>
                            <input type="email" id="recipientEmail" name="recipientEmail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
                            <input type="text" id="subject" name="subject" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea id="message" name="message" rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required></textarea>
                        </div>
                        <div className="flex justify-between">
                            <button type="button" className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-200" onClick={handleClear}>Clear</button>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200">Send Email</button>
                        </div>
                        <p className={`mt-2 ${result.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{result}</p>
                    </form>
                </div>
    </div>
</div>


    );
}

export default OrderDetails;
