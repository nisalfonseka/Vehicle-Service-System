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
    let time;
    switch (category) {
      case "Service Booking":
        time = priority === "High" ? "2 hours" : priority === "Medium" ? "4 hours" : "8 hours";
        break;
      case "Breakdown Service":
        time = priority === "High" ? "1 hour" : priority === "Medium" ? "3 hours" : "6 hours";
        break;
      case "Online Store":
        time = priority === "High" ? "3 hours" : priority === "Medium" ? "6 hours" : "12 hours";
        break;
      case "Sign up Issues":
        time = priority === "High" ? "4 hours" : priority === "Medium" ? "8 hours" : "16 hours";
        break;
      case "Other":
        time = priority === "High" ? "5 hours" : priority === "Medium" ? "10 hours" : "20 hours";
        break;
      default:
        time = "Unknown";
    }
    setEstimatedTime(time);
  };

  const handleSaveCustomer = () => {
    if (!customerName.trim()) {
      enqueueSnackbar("Please enter the customer's name", { variant: "error" });
      return;
    }

    if (!mobileNumber.trim()) {
      enqueueSnackbar("Please enter the contact number", { variant: "error" });
      return;
    }

    if (!email.trim()) {
      enqueueSnackbar("Please enter the email address", { variant: "error" });
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
        enqueueSnackbar("Customer Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error occurred while creating the customer", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f8ff" }}>
      <BackButton />
      <h1 style={{ fontSize: "36px", marginBottom: "20px", color: "#1E90FF" }}>Raise a Ticket</h1>
      {loading && <Spinner />}
      <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          borderRadius: "20px", 
          width: "600px", 
          padding: "20px", 
          margin: "0 auto", 
          backgroundColor: "#63C5DA", 
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" 
        }}>
        {/* Existing fields */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Customer Name</label>
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
              color: "#2f4f4f",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Contact Number</label>
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
              color: "#2f4f4f",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Email</label>
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
              color: "#2f4f4f",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Vehicle Number</label>
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
              color: "#2f4f4f",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#2f4f4f",
            }}
          />
        </div>

        {/* New Category dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#2f4f4f",
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

        {/* New Priority dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", color: "#483d8b" }}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              border: "2px solid #000000",
              padding: "10px",
              width: "100%",
              borderRadius: "10px",
              outline: "none",
              color: "#2f4f4f",
              backgroundColor: "#ffffff",
            }}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Not urgent">Not urgent</option>
          </select>
        </div>

        {/* Display Estimated Time */}
        {estimatedTime && (
          <div style={{ marginBottom: "20px", fontSize: "18px", color: "#483d8b", fontWeight: "bold" }}>
            Estimated reply time: {estimatedTime}
          </div>
        )}

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#022D36",
            color: "#ffffff",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
            border: "none",
            outline: "none",
            marginTop: "20px",
          }}
          onClick={handleSaveCustomer}
        >
          Add Customer
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
