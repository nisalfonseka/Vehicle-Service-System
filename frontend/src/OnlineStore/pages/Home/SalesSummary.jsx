import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // For automatic table generation
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

    // Function to download the sales summary as a PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Online Sales Summary', 14, 20);
    
        // Get current date and time
        const date = new Date();
        const formattedDate = date.toLocaleString(); // Format as 'MM/DD/YYYY, HH:MM AM/PM'
    
        // Add report generation date
        doc.setFontSize(12);
        doc.text(`Generated on: ${formattedDate}`, 14, 30); // Adjust y-position as needed
    
        // Add total revenue and other stats
        doc.setFontSize(16);
        doc.text(`Total Revenue: LKR ${totalRevenue}`, 14, 40);
        doc.text(`Pending Orders: ${pendingOrders}`, 14, 50);
        doc.text(`Completed Orders: ${completedOrders}`, 14, 60);
        doc.text(`Canceled Orders: ${canceledOrders}`, 14, 70);
    
        // Add Orders Breakdown table
        const tableData = orders.map(order => [
            order._id,
            order.customerInfo.name,
            order.status,
            order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
        ]);
    
        autoTable(doc, {
            head: [['Order ID', 'Customer Name', 'Status', 'Total Price']],
            body: tableData,
            startY: 90, // Adjust to avoid overlapping with previous text
        });
    
        doc.save('sales_summary.pdf');
    };
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

                {/* Download Button */}
                <button
                    onClick={downloadPDF}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-6 hover:bg-blue-600 transition-all duration-200"
                >
                    Sales Summary
                </button>

                {/* Orders Breakdown Table */}
                <h3 className="text-2xl font-bold mb-4">Orders Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                
                                <th className="py-3 px-4 text-left">Customer Name</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    
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
