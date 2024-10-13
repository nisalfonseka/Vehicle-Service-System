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

  const [ageError, setAgeError] = useState(""); // State for age validation error
  const [yearError, setYearError] = useState(""); // State for joined year validation error
  const navigate = useNavigate();

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, Age: value });

    if (value < 18) {
      setAgeError("Employee must be at least 18 years old.");
    } else if (value > 65) {
      setAgeError("Employee age cannot exceed 65 years.");
    } else {
      setAgeError(""); // Clear error if age is valid
    }
  };

  const handleJoinedYearChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, joinedYear: value });

    const currentYear = new Date().getFullYear();
    if (value > currentYear) {
      setYearError("Please check the joined year.");
    } else {
      setYearError(""); // Clear error if joined year is valid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { employeeName, email, password, contactNo, Age, joinedYear, position, licenseNo, salary } = employee;
    if (!employeeName || !email || !password || !contactNo || !Age || !position || !licenseNo || !joinedYear || !salary) {
      alert("Please fill out all required fields.");
      return;
    }

    if (ageError || yearError) {
      alert("Please correct the errors before submitting.");
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

    axios
      .post("http://localhost:5555/empmanageRequests", formData)
      .then((response) => {
        navigate("/dashboard/emp/employee");
        alert(response.data.Error || "Record Added Successfully!");
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };

  // Updated CSS styles
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

  const titleStyle = {
    textAlign: "center",
    color: "#000",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: 700,
    textShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  };

  const formStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
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
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h3 style={titleStyle}>Add Employee</h3>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label" style={labelStyle}>
              Name
            </label>
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
            <label htmlFor="inputEmail4" className="form-label" style={labelStyle}>
              Email
            </label>
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
            <label htmlFor="inputPassword4" className="form-label" style={labelStyle}>
              Password
            </label>
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
            <label htmlFor="inputContactNo" className="form-label" style={labelStyle}>
              Contact No
            </label>
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
            <label htmlFor="inputAge" className="form-label" style={labelStyle}>
              Age
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputAge"
              placeholder="Enter Age"
              autoComplete="off"
              style={inputStyle}
              value={employee.Age}
              onChange={handleAgeChange}
            />
            {ageError && <p style={{ color: "red", fontSize: "14px" }}>{ageError}</p>}
          </div>
          <div className="col-12">
            <label htmlFor="inputJoinedYear" className="form-label" style={labelStyle}>
              Joined Year
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputJoinedYear"
              placeholder="Enter Joined Year"
              autoComplete="off"
              style={inputStyle}
              value={employee.joinedYear}
              onChange={handleJoinedYearChange}
            />
            {yearError && <p style={{ color: "red", fontSize: "14px" }}>{yearError}</p>}
          </div>
          <div className="col-12">
            <label htmlFor="inputPosition" className="form-label" style={labelStyle}>
              Position
            </label>
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
            <label htmlFor="inputLicense" className="form-label" style={labelStyle}>
              License No
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLicense"
              placeholder="Enter License No"
              autoComplete="off"
              style={inputStyle}
              value={employee.licenseNo}
              onChange={(e) => setEmployee({ ...employee, licenseNo: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label" style={labelStyle}>
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              style={inputStyle}
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn" style={buttonStyle}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
