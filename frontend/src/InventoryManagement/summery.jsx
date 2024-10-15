import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ManagerHeader from '../InventoryManagement/managerHeader';
import { useReactToPrint } from 'react-to-print';

const InventorySummaryReport = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportDateTime, setReportDateTime] = useState(''); // State to store the report generation date and time

  const reportRef = useRef(); // Reference for generating PDF

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5555/inventory-items');
        setItems(response.data);
        setLoading(false);
        setReportDateTime(new Date().toLocaleString()); // Set the date and time when the data is fetched
      } catch (error) {
        setError('Error fetching inventory items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Function to calculate profit and totals
  const calculateSummary = () => {
    const summary = {};

    items.forEach(item => {
      const { category, name, qty, buyingPrice, price } = item;
      const total = qty * buyingPrice;
      const profit = (price - buyingPrice) * qty;

      if (!summary[category.name]) {
        summary[category.name] = {
          items: [],
          categoryTotal: 0,
          categoryProfit: 0,
        };
      }

      summary[category.name].items.push({
        name,
        qty,
        buyingPrice,
        price,
        total,
        profit,
      });

      summary[category.name].categoryTotal += total;
      summary[category.name].categoryProfit += profit;
    });

    return summary;
  };

  // Handle print and download PDF
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: 'Inventory Summary Report',
  });

  const summary = calculateSummary();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='flex'>
      <ManagerHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Inventory Summary Report</h1>
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Download as PDF
          </button>
        </div>

        {/* Display the date and time when the report is generated */}
        <div className="text-gray-700 mb-4">
          <strong>Report Generated on:</strong> {reportDateTime}
        </div>

        <div ref={reportRef} className="bg-white p-6 rounded-lg shadow-lg">
          {Object.keys(summary).map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700">{category}</h2>
              <table className="table-auto w-full mt-4 border-collapse">
                <thead>
                  <tr className="bg-red-600 text-left">
                    <th className="p-2">Item Name</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Buying Price (LKR)</th>
                    <th className="p-2">Selling Price (LKR)</th>
                    <th className="p-2">Total Cost (LKR)</th>
                    <th className="p-2">Profit (LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {summary[category].items.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b ${item.qty < 3 ? 'bg-red-100' : ''}`}
                    >
                      <td className="text-gray-700">{item.name}</td>
                      <td className="text-gray-700">{item.qty}</td>
                      <td className="text-gray-700">{item.buyingPrice.toFixed(2)}</td>
                      <td className="text-gray-700">{item.price.toFixed(2)}</td>
                      <td className="text-gray-700">{item.total.toFixed(2)}</td>
                      <td className="text-gray-700">{item.profit.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <p><strong>Category Total Cost: </strong>LKR {summary[category].categoryTotal.toFixed(2)}</p>
                <p><strong>Category Total Profit: </strong>LKR {summary[category].categoryProfit.toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Low Stock Items</h3>
            <ul className="mt-2">
              {items
                .filter(item => item.qty < 3)
                .map(item => (
                  <li key={item._id} className="text-gray-700 border-b">
                    {item.name} - Quantity: {item.qty}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummaryReport;
