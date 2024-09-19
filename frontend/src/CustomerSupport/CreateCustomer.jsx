import React, { useState, useEffect } from "react";
import BackButton from "../BookingManagement/BackButton";
import Spinner from "../BookingManagement/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function ContactForm() {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  

  useEffect(() => {
    if (category && priority) {
      calculateEstimatedTime(category, priority);
    }
  }, [category, priority]);

  const calculateEstimatedTime = (category, priority) => {
    let days;
    switch (category) {
      case "Service Booking":
        days = priority === "High" ? 2 : priority === "Medium" ? 4 : 8;
        break;
      case "Breakdown Service":
        days = priority === "High" ? 1 : priority === "Medium" ? 3 : 6;
        break;
      case "Online Store":
        days = priority === "High" ? 3 : priority === "Medium" ? 6 : 12;
        break;
      case "Sign up Issues":
        days = priority === "High" ? 4 : priority === "Medium" ? 8 : 16;
        break;
      case "Other":
        days = priority === "High" ? 5 : priority === "Medium" ? 10 : 20;
        break;
      default:
        days = 0;
    }

    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + days);

    const formattedDate = estimatedDate.toLocaleDateString();
    setEstimatedTime(`Approximately ${days} Days (${formattedDate})`);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobileNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(mobileNumber);
  };

  const handleSaveCustomer = () => {
    if (!customerName.trim()) {
      enqueueSnackbar("Please enter the customer's name", { variant: "error" });
      return;
    }

    if (!mobileNumber.trim() || !validateMobileNumber(mobileNumber)) {
      enqueueSnackbar("Please enter a valid 10-digit contact number", { variant: "error" });
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
      return;
    }

    if (!vehicleNumber.trim()) {
      enqueueSnackbar("Please enter the vehicle number", { variant: "error" });
      return;
    }

    if (!subject.trim()) {
      enqueueSnackbar("Please enter the subject", { variant: "error" });
      return;
    }

    if (!category.trim()) {
      enqueueSnackbar("Please select a category", { variant: "error" });
      return;
    }

    if (!priority.trim()) {
      enqueueSnackbar("Please select a priority", { variant: "error" });
      return;
    }

    const data = {
      customerName,
      mobileNumber,
      email,
      vehicleNumber,
      subject,
      category,
      priority,
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/customer", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Ticket Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error occurred while creating the Ticket", { variant: "error" });
        console.error(error);
      });
  };

  const handleAdminDashboard = () => {
    navigate("/admin-dashboard");
  };

  const handleCustomerDashboard = () => {
    navigate("/customer-dashboard");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
      <BackButton />
      <h1 style={{ fontSize: "36px", marginBottom: "20px", color: "#000000" }}>Create Ticket</h1>
      {loading && <Spinner />}
      <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          border: '2px solid #000000',
          borderRadius: "20px", 
          width: "600px", 
          padding: "20px", 
          margin: "0 auto", 
          backgroundColor: "#e0f7fa",  // Light blue background
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" 
        }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Customer Name :</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Contact Number :</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Vehicle Number :</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Subject :</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "20px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Category :</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Select Category</option>
            <option value="Service Booking">Service Booking</option>
            <option value="Breakdown Service">Breakdown Service</option>
            <option value="Online Store">Online Store</option>
            <option value="Sign up Issues">Sign up Issues</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Priority :</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#000000",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Select Priority </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#000000" }}>Estimated Solve Time :</label>
          <input
            type="text"
            value={estimatedTime}
            readOnly
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              backgroundColor: "#ffffff",
              color: "#000000",
            }}
          />
        </div>
        <button
          onClick={handleSaveCustomer}
          style={{
            backgroundColor: "#cc0000",
            color: "#fff",
            padding: "15px",
            borderRadius: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            outline: "none",
            border: "none",
          }}
        >
          Submit Ticket
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
