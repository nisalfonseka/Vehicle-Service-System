import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="sales-manager-container1 grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Sales Manager Section */}
      <div className="section relative group bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <Link to="/inventory" className="section-link block text-center p-8">
          <div className="pic1 h-40 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mb-6 flex items-center justify-center text-white">
            {/* Placeholder for an image */}
            <span className="text-6xl">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 transition-all duration-300 group-hover:text-blue-600">
            Sales Manager
          </h2>
          <p className="text-gray-700 text-base transition-all duration-300 group-hover:text-gray-900">
            Manage sales, inventory, and performance analytics from here.
          </p>
        </Link>
        {/* Decorative Element */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
      </div>

      {/* Online Store Section */}
      <div className="section relative group bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <Link to="/Store" className="section-link block text-center p-8">
          <div className="pic2 h-40 bg-gradient-to-r from-green-400 to-green-600 rounded-lg mb-6 flex items-center justify-center text-white">
            {/* Placeholder for an image */}
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 transition-all duration-300 group-hover:text-green-600">
            Online Store
          </h2>
          <p className="text-gray-700 text-base transition-all duration-300 group-hover:text-gray-900">
            Explore the online store and manage items and orders.
          </p>
        </Link>
        {/* Decorative Element */}
        <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AdminHome;
