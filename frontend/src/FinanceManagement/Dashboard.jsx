import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Navbar from '../FinanceManagement/Navbar';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [totalInvoices, setTotalInvoices] = useState(12); // Updated value
  const [totalProfits, setTotalProfits] = useState(20); // Updated value
  const [totalIncomes, setTotalIncomes] = useState(25); // Updated value
  const [totalExpenses, setTotalExpenses] = useState(8); // Updated value

  // Animation effect on counts
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProfits(prev => Math.floor(Math.random() * 30));
      setTotalInvoices(prev => Math.floor(Math.random() * 20));
      setTotalIncomes(prev => Math.floor(Math.random() * 30));
      setTotalExpenses(prev => Math.floor(Math.random() * 15));
    }, 3000); // Change values every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    series: [{
      name: 'Counts',
      data: [totalProfits, totalInvoices, totalIncomes, totalExpenses],
    }],
  };

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    title: {
      text: 'Ashan Auto Service Analysis',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#1a1818',
      },
    },
    xaxis: {
      categories: ['Profits', 'Total Invoices', 'Total Incomes', 'Total Expenses'],
      labels: {
        style: {
          fontFamily: 'Poppins',
          fontWeight: 'bold',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Count',
      },
      labels: {
        style: {
          fontFamily: 'Poppins',
          fontWeight: 'bold',
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '50%',
        colors: {
          ranges: [
            {
              from: 0,
              to: 1,
              color: '#ff4560', // Color for Profits
            },
            {
              from: 1,
              to: 2,
              color: '#00e396', // Color for Total Invoices
            },
            {
              from: 2,
              to: 3,
              color: '#775dd0', // Color for Total Incomes
            },
            {
              from: 3,
              to: 4,
              color: '#ff9800', // Color for Total Expenses
            },
          ],
        },
      },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <div className="content">
          <h1 className="text-4xl my-5">Ashan Auto Service</h1>
          <h2 className="dashboard-title">DASHBOARD</h2>
          <div className="cards-container">
            <div className="card profits">
              <h3>Profits</h3>
              <p>Total - {totalProfits}</p>
            </div>
            <div className="card total-invoices">
              <h3>Total Invoices</h3>
              <p>Total - {totalInvoices}</p>
            </div>
            <div className="card total-incomes">
              <h3>Total Incomes</h3>
              <p>Total - {totalIncomes}</p>
            </div>
            <div className="card total-expenses">
              <h3>Total Expenses</h3>
              <p>Total - {totalExpenses}</p>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <Chart options={options} series={chartData.series} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
