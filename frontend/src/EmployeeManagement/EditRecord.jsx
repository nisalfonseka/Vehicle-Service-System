import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        employeeName: "",
        email: "",
        password: "",
        contactNo: "",
        Age: "",
        joinedYear: "",
        position: "",
        licenseNo: "",
        salary: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const result = await axios.get(`http://localhost:5555/empmanageRequests/${id}`);
                setEmployee(result.data); // Directly set fetched data to state
            } catch (err) {
                console.error("Error fetching employee data:", err);
                alert('Failed to fetch employee data.');
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5555/empmanageRequests/${id}`, employee);
            console.log('Update Response:', response.data);
            alert(response.data.message || "Record Updated Successfully!");
            navigate('/dashboard/emp/employee');
        } catch (err) {
            console.error('Error updating employee:', err);
            alert('An error occurred while updating the record.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value, // Update the specific field
        }));
    };

    //css
    const pageStyle = {
        height: "100vh",
        background: "linear-gradient(to right, #d3d3d3, #a9a9a9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    
      const containerStyle = {
        background: "rgba(255, 255, 255, 0.85)", // Transparent white background
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        width: "90%",
        maxWidth: "800px",
        position: "relative",
      };
    
    const buttonStyle = {
        background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
        border: "none",
        fontWeight: 700,
        padding: "12px",
        borderRadius: "12px",
        color: "#fff",
        transition: "background 0.3s, transform 0.2s, box-shadow 0.3s",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
      };

    return (
                 <div style={pageStyle}>
                 <div style={containerStyle}>
                <h3 className="text-center text-gray-800 text-2xl font-bold mb-6">Edit Employee</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {Object.entries(employee).map(([key, value]) => (
                        <div key={key}>
                            <label htmlFor={`input${key}`} className="block text-gray-700 font-medium mb-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                            <input
                                type={key === 'password' ? 'password' : 'text'}
                                className="w-full bg-gray-200 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id={`input${key}`}
                                name={key}
                                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                                autoComplete="off"
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div>
                    <button type="submit" className="btn" style={buttonStyle}> Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
