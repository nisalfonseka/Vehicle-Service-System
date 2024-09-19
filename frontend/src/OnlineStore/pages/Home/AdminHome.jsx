import React from 'react';
import { Link } from 'react-router-dom';
import '../../mycss/Home.css';


const AdminHome = () => {
  return (
    <div className="sales-manager-container">
      <div className="section">
          <Link to="/managerhome" style={{ textDecoration: 'none' }}>
          <div className="pic1"></div>
          <h2>Sales Manager</h2>
          <p>This is the Sales Manager section.</p>
       </Link>
      </div>
      
      <div className="section">
      <Link to="/Store" style={{ textDecoration: 'none' }}>
      
          <div className="pic2"></div>
          <h2>Online Store</h2>
          <p>This is the online store section.</p>
          </Link>
      </div>
      
      
    </div>
  );
}



export default AdminHome;

