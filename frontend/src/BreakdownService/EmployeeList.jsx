import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // State to store employee data
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5555/employees'); // Updated the port to 5555
        setEmployees(response.data); // Store employee data
      } catch (err) {
        setError('Error fetching employee data');
      }
    };

    fetchEmployees(); // Trigger the fetch on component mount
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Age</th>
              <th>Joined Year</th>
              <th>Position</th>
              <th>License No</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.employeeName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.contactNo}</td>
                  <td>{employee.Age}</td>
                  <td>{employee.joinedYear}</td>
                  <td>{employee.position}</td>
                  <td>{employee.licenseNo}</td>
                  <td>{employee.salary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
