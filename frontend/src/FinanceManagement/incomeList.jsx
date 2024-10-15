import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MdSearch } from 'react-icons/md'; // Import search icon
import NavBar from './Navbar';
import logo from '../FinanceManagement/AaaaAuto (1).png';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const toBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };

  const filteredByDate = orders.filter(order => {
    const orderDate = new Date(order.updatedAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return orderDate >= start && orderDate <= end;
    }
    return true;
  });

  const filteredOrders = filteredByDate.filter(order =>
    order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalIncome = filteredOrders.reduce((total, order) => {
    const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total + orderTotal;
  }, 0);

  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? (totalIncome / totalOrders).toFixed(2) : 0;
  const highestOrderValue = Math.max(...filteredOrders.map(order =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )).toFixed(2);

  const lowestOrderValue = Math.min(...filteredOrders.map(order =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )).toFixed(2);

  const generatePDF = async () => {
    const doc = new jsPDF();

    const logoBase64 = await toBase64(logo);
    doc.addImage(logoBase64, 'PNG', 14, 10, 40, 20);

    doc.setFontSize(20);
    doc.text('Income Report', 14, 40);
    doc.setFontSize(12);

    doc.text(`Date Range: ${startDate ? new Date(startDate).toLocaleDateString() : 'N/A'} - ${endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}`, 14, 50);
    doc.text(`Total Orders: ${totalOrders}`, 14, 60);
    doc.text(`Total Income: ${totalIncome.toFixed(2)} LKR`, 14, 70);
    doc.text(`Average Order Value: ${averageOrderValue} LKR`, 14, 80);
    doc.text(`Highest Order Value: ${highestOrderValue} LKR`, 14, 90);
    doc.text(`Lowest Order Value: ${lowestOrderValue} LKR`, 14, 100);

    const tableData = filteredOrders.map(order => {
      const items = order.items.map(item => `${item.name} (x${item.quantity})`).join('; ');
      const total = order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      return {
        customerName: order.customerInfo.name,
        items: items,
        updatedAt: new Date(order.updatedAt).toLocaleDateString(),
        totalPrice: `${total} LKR`
      };
    });

    doc.autoTable({
      startY: 110,
      head: [['Customer Name', 'Items', 'Date', 'Total Price']],
      body: tableData.map(item => [item.customerName, item.items, item.updatedAt, item.totalPrice]),
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [10, 47, 86], textColor: [255, 255, 255] }, // Updated header color
      margin: { top: 10 }
    });

    doc.save('completed_orders_report.pdf');
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <NavBar />
      <div className="w-full ml-56 mr-40 p-6">
        <h1 className="text-4xl my-8 mb-6 text-center"><b>Ashan Auto Service</b></h1>
        <h3 className="text-2xl text-[#0a2f56] mt-6 mb-6 text-center">Income List</h3>

        <div className="search-bar-container flex items-center justify-center mb-6">
  <div className="relative w-1/3">
    <input
      type="text"
      className="w-full p-2 border border-[#0a2f56] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#0a2f56]"
      placeholder="Search Incomes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
   <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-2xl" />

  </div>
</div>


        <h4 className="text-2xl text-[#0a2f56] mb-4 text-center">Select Date Range for Order Analysis</h4>

        <div className="flex justify-center mb-6 space-x-4">
          <div className="flex flex-col items-center">
            <label className="text-[#0a2f56] mb-2">From</label>
            <input
              type="date"
              className="p-2 border border-[#0a2f56] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#0a2f56]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-[#0a2f56] mb-2">To</label>
            <input
              type="date"
              className="p-2 border border-[#0a2f56] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#0a2f56]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
            onClick={generatePDF}
          >
            Generate Report
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold text-[#0a2f56]">Summary</h2>
          <p>Total Orders: {totalOrders}</p>
          <p>Average Order Value: {averageOrderValue} LKR</p>
          <p>Highest Order Value: {highestOrderValue} LKR</p>
          <p>Lowest Order Value: {lowestOrderValue} LKR</p>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center">No completed orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-[#0a2f56] shadow-md rounded-lg">
              <thead className="bg-[#0a2f56]">
                <tr>
                  <th className="border border-[#0a2f56] px-4 py-2 text-white">Customer Name</th>
                  <th className="border border-[#0a2f56] px-4 py-2 text-white">Items</th>
                  <th className="border border-[#0a2f56] px-4 py-2 text-white">Date</th>
                  <th className="border border-[#0a2f56] px-4 py-2 text-white">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="border border-[#0a2f56] px-4 py-2">{order.customerInfo.name}</td>
                    <td className="border border-[#0a2f56] px-4 py-2">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.name} (x{item.quantity}){index < order.items.length - 1 ? '; ' : ''}
                        </span>
                      ))}
                    </td>
                    <td className="border border-[#0a2f56] px-4 py-2">{new Date(order.updatedAt).toLocaleDateString()}</td>
                    <td className="border border-[#0a2f56] px-4 py-2">
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
