import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="sales-manager-container">
      {/* Sales Manager Section */}
      <div className="section">
        <Link to="/inventory" className="section-link">
          <div className="pic1"></div>
          <h2>Sales Manager</h2>
          <p>Manage sales, inventory, and performance analytics from here.</p>
        </Link>
      </div>
      
      {/* Online Store Section */}
      <div className="section">
        <Link to="/Store" className="section-link">
          <div className="pic2"></div>
          <h2>Online Store</h2>
          <p>Explore the online store and manage items and orders.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;
