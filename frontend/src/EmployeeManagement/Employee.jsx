import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
    const [empmanageRequests, setempmanageRequests] = useState([]);
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

    return (
        <div className="p-5 bg-gray-100 rounded-lg shadow-md overflow-x-auto">
            <div className="flex justify-center">
                <h3 className="text-center text-black text-2xl mb-5 font-bold uppercase tracking-wide border-b-2 border-black pb-2">
                    Employee Record Details
                </h3>
            </div>
            <Link to="/dashboard/emp/add_employee" className="bg-green-600 text-white rounded-md px-4 py-2 mb-5 hover:bg-green-500 transition-transform duration-300 transform hover:scale-105">
                Add Employee
            </Link>
            <div className="mt-3">
                <table className="w-full border-collapse border-separate border-spacing-0 shadow-lg bg-white rounded-lg">
                    <thead>
                        <tr>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Employee ID</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Name</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Email</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Contact Number</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Position</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">License No</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Salary</th>
                            <th className="bg-blue-600 text-white font-bold uppercase p-3">Actions</th>
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
        </div>
    );
};

export default Employee;
