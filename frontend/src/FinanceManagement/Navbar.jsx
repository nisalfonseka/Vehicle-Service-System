import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../FinanceManagement/AaaaAuto (1).png';
import { FaBars, FaTimes } from 'react-icons/fa'; // FontAwesome icons for expand/collapse

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`nav-vertical ${isExpanded ? 'expanded' : ''}`}>
      <button className="toggle-button" onClick={toggleNavbar}>
        {isExpanded ? <FaTimes /> : <FaBars />} {/* Toggle between icons */}
      </button>
      <div className="nav-header">
        {isExpanded && (
          <>
            <Link to="/">
              <img src={logo} alt="Ashan Auto Service Logo" className="nav-logo" />
            </Link>
            <h1 className="project-name">Finance Management</h1>
          </>
        )}
      </div>
      <div className="nav-links">
        <Link className="nav-link" to="/dashboard/finance/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/dashboard/finance/invoices">Invoices</Link>
        <Link className="nav-link" to="/dashboard/finance/incomes">Incomes</Link>
        <Link className="nav-link" to="/dashboard/finance/expenses">Expenses</Link>
      </div>
    </nav>
  );
};

export default Navbar;
