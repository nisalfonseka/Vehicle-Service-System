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
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/dashboard/senura">
            Inventory
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/dashboard/catagory">
              Category
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/dashboard/addcatagory">
            add Catagory
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="#">
            
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/dashboard/summery">
            Report
          </Link>
          <Link className="text-gray-700 hover:text-blue-600 font-semibold" to="/dashboard/additem">
            Add Item
          </Link>
        </div>

        
          
        
      </nav>

      {/* Content Area */}
      <div className="flex-1 ml-64 p-4">
        {/* Other content of your page goes here */}
      </div>
    </div>
  );
}

export default ManagerHeader;
