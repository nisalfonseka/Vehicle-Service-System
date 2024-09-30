import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DashboardEmp from '../EmployeeManagement/Dashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomeEmp = () => {
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [employeeCountByYear, setEmployeeCountByYear] = useState([]);

  useEffect(() => {
    fetchEmployeeCount();
    fetchTotalSalary();
    fetchAdminData(); 
    fetchEmployeeCountByYear(); 
  }, []);

  const fetchEmployeeCount = () => {
    axios.get('http://localhost:5555/empmanageRequests/total-employee-count')
      .then(result => {
        setEmployeeTotal(result.data.totalEmployees || 0);
      })
      .catch(error => {
        console.error("Error fetching total employee count:", error);
      });
  };

  const fetchTotalSalary = () => {
    axios.get('http://localhost:5555/empmanageRequests/total-salary')
      .then(result => {
        setSalaryTotal(result.data.totalSalary || 0);
      })
      .catch(error => {
        console.error("Error fetching total salary:", error);
      });
  };

  const fetchAdminData = () => {
    axios.get('http://localhost:5555/profile')
      .then(result => {
        setAdmins([result.data]);
      })
      .catch(error => {
        console.error("Error fetching admin data:", error);
        alert("An error occurred while fetching admin data.");
      });
  };

  const fetchEmployeeCountByYear = () => {
    axios.get('http://localhost:5555/empmanageRequests/recruitment-per-year')
      .then(result => {
        const filteredData = result.data.filter(item => item._id >= 2015);
        setEmployeeCountByYear(filteredData);
      })
      .catch(error => {
        console.error("Error fetching employee count by year:", error);
      });
  };

  const barChartData = {
    labels: employeeCountByYear.map(item => item._id),
    datasets: [
      {
        label: 'Employees',
        data: employeeCountByYear.map(item => Math.floor(item.count)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Employee Count',
        },
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Employee Recruitment Over the Years',
      },
    },
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
      {/* Admin and Employee stats */}
      <div className="flex justify-around p-3 mt-3">
        {/* Stats cards */}
        <div className="bg-gray-400 rounded-lg shadow-md p-5 text-center transform transition-transform hover:translate-y-1">
          <h4 className="mb-2 text-xl text-gray-800">Admins</h4>
          <hr />
          <div className="flex justify-between mt-2">
            <h5>Total:</h5>
            <h5 className="text-blue-600 font-bold">{admins.length}</h5>
          </div>
        </div>
  
        <div className="bg-gray-400 rounded-lg shadow-md p-5 text-center transform transition-transform hover:translate-y-1">
          <h4 className="mb-2 text-xl text-gray-800">Employee</h4>
          <hr />
          <div className="flex justify-between mt-2">
            <h5>Total:</h5>
            <h5 className="text-blue-600 font-bold">{employeeTotal}</h5>
          </div>
        </div>
  
        <div className="bg-gray-400 rounded-lg shadow-md p-5 text-center transform transition-transform hover:translate-y-1">
          <h4 className="mb-2 text-xl text-gray-800">Salary</h4>
          <hr />
          <div className="flex justify-between mt-2">
            <h5>Total:</h5>
            <h5 className="text-blue-600 font-bold">Rs {salaryTotal.toFixed(2)}</h5>
          </div>
        </div>
      </div>
  
      {/* Employee Count Bar Graph */}
      <div className="flex flex-col items-center my-5 max-w-lg mx-auto">
        <h3 className="mb-5 text-2xl">Employee Recruitment Over the Years</h3>
        <Bar
          data={{
            labels: employeeCountByYear.map(item => item._id),
            datasets: [
              {
                label: 'Employees',
                data: employeeCountByYear.map(item => Math.floor(item.count)),
                backgroundColor: 'rgba(29, 161, 242, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)', 
                borderWidth: 1,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>
  
{/* Admin List Section */}
<div className="mt-4 px-5 pt-3">
  <h3 className="text-2xl">List of Admins</h3>
  <table className="w-full mt-5 table-auto border-collapse shadow-lg">
    <thead className="bg-red-600 text-white uppercase"> {/* Changed to red */}
      <tr>
        <th className="p-4">Name</th>
        <th className="p-4">Email</th>
        <th className="p-4">Role</th>
        <th className="p-4">Action</th>
      </tr>
    </thead>
    <tbody>
      {admins.map(admin => (
        <tr key={admin.email} className="hover:bg-gray-200">
          <td className="p-4 border-b border-gray-300">{admin.name}</td>
          <td className="p-4 border-b border-gray-300">{admin.email}</td>
          <td className="p-4 border-b border-gray-300">{admin.role}</td>
          <td className="p-4 border-b border-gray-300">
            <button
              className="bg-green-600 text-white px-2 py-1 rounded-lg transition-transform transform hover:scale-105 mr-2"
              onClick={() => window.location.href = '/dashboard/emp/profile'}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
  
};

export default HomeEmp;
