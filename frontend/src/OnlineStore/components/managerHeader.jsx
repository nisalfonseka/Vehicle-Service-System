import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ManagerHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${searchQuery}`);
  };

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <nav className="bg-gray-100 border-r border-gray-300 fixed left-0 top-0 h-full w-64 flex flex-col justify-between p-4 shadow-lg">
        <div className="flex flex-col space-y-4">
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/inventory">
            Inventory
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/orderlist">
            Active Orders
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="#">
            Cancelled Orders
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="#">
            Finished Orders
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="#">
            Report
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/additem">
            Add Item
          </Link>
        </div>

        {/* Search Bar */}
        <form className="flex mt-4" onSubmit={handleSearch}>
          <input
            className="border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-full"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>

      {/* Content Area */}
      <div className="flex-1 ml-64 p-4">
        {/* Other content of your page goes here */}
      </div>
    </div>
  );
}

export default ManagerHeader;
