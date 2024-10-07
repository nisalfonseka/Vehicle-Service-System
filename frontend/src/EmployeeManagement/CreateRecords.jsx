import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddEmployee = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const { employeeName, email, password, contactNo, Age, joinedYear, position, licenseNo, salary } = employee;
    if (!employeeName || !email || !password || !contactNo || !Age || !position || !licenseNo || !joinedYear || !salary) {
      alert("Please fill out all required fields.");
      return;
    }
      
    // Validate that the joined year is not in the future
  const currentYear = new Date().getFullYear();
  if (joinedYear > currentYear) {
    alert("Joined Year cannot be in the future.");
    return;
  }

    const formData = {
      employeeName,
      email,
      password,
      contactNo,
      Age,
      joinedYear,
      position,
      licenseNo,
      salary,
    };

    axios.post('http://localhost:5555/empmanageRequests', formData)
      .then((response) => {
        (response.data.Status);
        navigate('/dashboard/emp/employee');
        {
          alert(response.data.Error || "Record Added Successfully!");
        }
      })
      .catch((error) => {
        console.error('Error creating employee:', error);
      })
  };

  // Inline styles
  const containerStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    padding: "30px",
    width: "90%",
    maxWidth: "800px",
    margin: "40px auto",
    position: "relative",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: 700,
    textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    position: "relative",
  };

  const formStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    position: "relative",
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "#444",
    marginBottom: "5px",
    display: "block",
  };

  const inputStyle = {
    background: "rgba(240, 248, 255, 0.9)",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "12px",
    fontSize: "15px",
    color: "#333",
    transition: "border-color 0.3s, box-shadow 0.3s",
    backdropFilter: "blur(4px)",
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
    position: "relative",
    zIndex: 1,
  };

  return (
    <div style={containerStyle}>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
          <h3 style={titleStyle}>Add Employee</h3>
          <form style={formStyle} onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputName" className="form-label" style={labelStyle}>Name</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                placeholder="Enter Name"
                style={inputStyle}
                value={employee.employeeName}
                onChange={(e) => setEmployee({ ...employee, employeeName: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label" style={labelStyle}>Email</label>
              <input
                type="email"
                className="form-control rounded-0"
                id="inputEmail4"
                placeholder="Enter Email"
                autoComplete="off"
                style={inputStyle}
                value={employee.email}
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPassword4" className="form-label" style={labelStyle}>Password</label>
              <input
                type="password"
                className="form-control rounded-0"
                id="inputPassword4"
                placeholder="Enter Password"
                style={inputStyle}
                value={employee.password}
                onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputContactNo" className="form-label" style={labelStyle}>Contact No</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputContactNo"
                placeholder="Enter Contact No"
                autoComplete="off"
                style={inputStyle}
                value={employee.contactNo}
                onChange={(e) => setEmployee({ ...employee, contactNo: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAge" className="form-label" style={labelStyle}>Age</label>
              <input
                type="number" // Changed to number type
                className="form-control rounded-0"
                id="inputAge"
                placeholder="Enter Age"
                autoComplete="off"
                style={inputStyle}
                value={employee.Age}
                onChange={(e) => setEmployee({ ...employee, Age: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputJoinedYear" className="form-label" style={labelStyle}>Joined Year</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputJoinedYear"
                placeholder="Enter Joined Year"
                autoComplete="off"
                style={inputStyle}
                value={employee.joinedYear}
                onChange={(e) => setEmployee({ ...employee, joinedYear: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPosition" className="form-label" style={labelStyle}>Position</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputPosition"
                placeholder="Enter Position"
                autoComplete="off"
                style={inputStyle}
                value={employee.position}
                onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputLicenseNo" className="form-label" style={labelStyle}>License No</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputLicenseNo"
                placeholder="Enter License No"
                autoComplete="off"
                style={inputStyle}
                value={employee.licenseNo}
                onChange={(e) => setEmployee({ ...employee, licenseNo: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputSalary" className="form-label" style={labelStyle}>Salary</label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputSalary"
                placeholder="Enter Salary"
                autoComplete="off"
                style={inputStyle}
                value={employee.salary}
                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
              />
            </div>
            <div className="col-12">
              <button type="submit" style={buttonStyle}>Add Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
