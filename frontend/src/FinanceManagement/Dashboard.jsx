import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Navbar from '../FinanceManagement/Navbar';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Register the necessary components for the charts
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale);

const Dashboard = () => {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  // New state to hold profit data for the line graph
  const [profitData, setProfitData] = useState([]);

  // Fetch total expenses from the server
  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5555/expenseRequests/totalExpenses');
        const data = await response.json();
        setTotalExpenses(data.totalExpenses);
      } catch (error) {
        console.error('Error fetching total expenses:', error);
      }
    };

    fetchTotalExpenses();
  }, []);

  // Fetch total income from the server
  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await fetch('http://localhost:5555/invoiceRequests/totalIncome');
        const data = await response.json();
        setTotalIncomes(data.totalIncome);
      } catch (error) {
        console.error('Error fetching total income:', error);
      }
    };

    fetchTotalIncome();
  }, []);

  // Fetch total invoices
  useEffect(() => {
    const fetchTotalInvoices = async () => {
      try {
        const response = await fetch('http://localhost:5555/invoiceRequests/totalInvoices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalInvoices(data.totalInvoices);
      } catch (error) {
        console.error('Error fetching total invoices:', error);
      }
    };

    fetchTotalInvoices();
  }, []);

  // Calculate total profits when totalIncomes or totalExpenses change
  useEffect(() => {
    const currentProfit = totalIncomes - totalExpenses;
    setTotalProfits(currentProfit);
    // Update profit data for line graph (you can modify this logic to add data points over time)
    setProfitData(prev => [...prev, currentProfit]);
  }, [totalIncomes, totalExpenses]);

  const pieChartData = {
    labels: ['Total Income', 'Total Expenses'],
    datasets: [
        {
            label: 'Financial Overview',
            data: [totalIncomes, totalExpenses],
            backgroundColor: [
                '#ff9800', // Green
                '#f44336', // Orange
                '#2196F3', // Blue
                '#9C27B0', // Purple
                '#F44336', // Red
                '#FFC107', // Amber
            ],
            borderColor: ['rgba(255, 255, 255, 1)'], // White border for better contrast
            borderWidth: 2,
        },
    ],
};


  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
  };

  // Prepare data for the line chart
  const lineChartData = {
    labels: profitData.map((_, index) => `Month ${index + 1}`), // Assuming monthly data points
    datasets: [
      {
        label: 'Profit Over Time',
        data: profitData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Profit Trend',
      },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <div className="content">
          <h1 className="text-4xl my-5"><b>Ashan Auto Service</b></h1>
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
          <div className="line-chart-container">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="pie-chart-container">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
