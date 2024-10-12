import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [empmanageRequests, setempmanageRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For the search input
  const [searchResults, setSearchResults] = useState(null); // To store search results
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.get("http://localhost:5555/empmanageRequests");
        setempmanageRequests(result.data.data); 
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5555/empmanageRequests/${id}`);
      console.log("Delete Response:", response);
      
      if (response.data.Status) {
        setempmanageRequests((prevRequests) => prevRequests.filter((e) => e._id !== id));
        alert('Record deleted successfully!');
      } else {
        alert('Failed to delete the record: ' + (response.data.Error || 'Unknown error occurred'));
      }
    } catch (err) {
      console.error('Error during delete:', err);
      alert('An error occurred while deleting the record.');
    }
  };

  const handleSearch = async () => {
    try {
      const searchQuery = /^[0-9a-fA-F]{24}$/.test(searchTerm) 
        ? `employeeId=${searchTerm}` 
        : `employeeName=${searchTerm}`;
  
      console.log('Searching with query:', searchQuery); // Log the search query
  
      const response = await axios.get(`http://localhost:5555/empmanageRequests/search?${searchQuery}`);
  
      if (response.data) {
        setSearchResults(response.data); // Assuming response.data is structured as expected
      } else {
        alert('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results:', error.response ? error.response.data : error.message);
      alert('Error occurred while searching.');
    }
  };
  

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md overflow-x-auto">
      <div className="flex justify-center">
        <h3 className="text-center text-black text-2xl mb-5 font-bold uppercase tracking-wide border-b-2 border-black pb-2">
          Employee Record Details
        </h3>
      </div>

{/* Search Bar */}
<div className="mb-5">
  <input
    type="text"
    placeholder="Search by Employee ID or Name"
    className="border rounded-md px-3 py-2 mr-3 w-1/2" // Make the width longer
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    onClick={handleSearch}
    className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-500 transition-transform duration-300 transform hover:scale-105"
  >
    Search
  </button>
</div>


      <Link to="/dashboard/emp/add_employee" className="bg-green-600 text-white rounded-md px-4 py-2 mb-5 hover:bg-green-500 transition-transform duration-300 transform hover:scale-105">
        Add Employee
      </Link>

      {/* Display Search Results if available */}
      {searchResults ? (
        <div className="mt-3">
          <table className="w-full border-collapse border-separate border-spacing-0 shadow-lg bg-white rounded-lg">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="font-bold uppercase p-3">Employee ID</th>
                <th className="font-bold uppercase p-3">Name</th>
                <th className="font-bold uppercase p-3">Email</th>
                <th className="font-bold uppercase p-3">Contact Number</th>
                <th className="font-bold uppercase p-3">Position</th>
                <th className="font-bold uppercase p-3">License No</th>
                <th className="font-bold uppercase p-3">Salary</th>
                <th className="font-bold uppercase p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 border">{searchResults.employeeId}</td> 
                <td className="p-3 border">{searchResults.employeeName}</td>
                <td className="p-3 border">{searchResults.email}</td>
                <td className="p-3 border">{searchResults.contactNo}</td>
                <td className="p-3 border">{searchResults.position}</td>
                <td className="p-3 border">{searchResults.licenseNo}</td>
                <td className="p-3 border">{searchResults.salary}</td>
                <td className="p-3 border">
                  <Link
                    to={`/dashboard/emp/edit_employee/` + searchResults.employeeId}
                    className="bg-green-600 text-white rounded-md px-3 py-1 mr-2 hover:bg-green-500 transition-transform duration-300 transform hover:scale-105"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-600 text-white rounded-md px-3 py-1 hover:bg-red-500 transition-transform duration-300 transform hover:scale-105 ml-2"
                    onClick={() => handleDelete(searchResults.employeeId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-3">
          <table className="w-full border-collapse border-separate border-spacing-0 shadow-lg bg-white rounded-lg">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="font-bold uppercase p-3">Employee ID</th>
                <th className="font-bold uppercase p-3">Name</th>
                <th className="font-bold uppercase p-3">Email</th>
                <th className="font-bold uppercase p-3">Contact Number</th>
                <th className="font-bold uppercase p-3">Position</th>
                <th className="font-bold uppercase p-3">License No</th>
                <th className="font-bold uppercase p-3">Salary</th>
                <th className="font-bold uppercase p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {empmanageRequests.map((e) => (
                <tr key={e._id} className="border-b">
                  <td className="p-3 border">{e._id}</td> 
                  <td className="p-3 border">{e.employeeName}</td>
                  <td className="p-3 border">{e.email}</td>
                  <td className="p-3 border">{e.contactNo}</td>
                  <td className="p-3 border">{e.position}</td>
                  <td className="p-3 border">{e.licenseNo}</td>
                  <td className="p-3 border">{e.salary}</td>
                  <td className="p-3 border">
                    <Link
                      to={`/dashboard/emp/edit_employee/` + e._id}
                      className="bg-green-600 text-white rounded-md px-3 py-1 mr-2 hover:bg-green-500 transition-transform duration-300 transform hover:scale-105"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-600 text-white rounded-md px-3 py-1 hover:bg-red-500 transition-transform duration-300 transform hover:scale-105 ml-2"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employee;
