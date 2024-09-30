import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBoxOpen, FaTimesCircle, FaCheckCircle, FaChartLine, FaSearch } from 'react-icons/fa';

function ManagerHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${searchQuery}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Navigation */}
      <nav className="bg-white shadow-lg border-r border-gray-300 fixed left-0 top-0 h-full w-64 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Manager Dashboard</h1>
        <div className="flex-grow">
          <div className="flex flex-col space-y-5">
            <Link className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200 p-2 rounded-lg hover:bg-gray-200" to="/inventory">
              <FaBoxOpen className="mr-2" /> Inventory
            </Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200 p-2 rounded-lg hover:bg-gray-200" to="/orderlist">
              <FaClipboardList className="mr-2" /> All Orders
            </Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200 p-2 rounded-lg hover:bg-gray-200" to="/pending">
              <FaTimesCircle className="mr-2" /> Pending Orders
            </Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200 p-2 rounded-lg hover:bg-gray-200" to="/cancel">
              <FaTimesCircle className="mr-2" /> Cancelled Orders
            </Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200 p-2 rounded-lg hover:bg-gray-200" to="/finish">
              <FaCheckCircle className="mr-2" /> Finished Orders
            </Link>
            <Link className="flex items-center text-gray-700 hover:text-blue-600 font-semibold transition duration-200 p-2 rounded-lg hover:bg-gray-200" to="/report">
              <FaChartLine className="mr-2" /> Report
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <form className="mt-8" onSubmit={handleSearch}>
          <div className="flex">
            
            
          </div>
        </form>
      </nav>

      
    </div>
  );
}

export default ManagerHeader;
