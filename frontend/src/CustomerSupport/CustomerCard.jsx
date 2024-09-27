import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSingleCard from "./CustomerSingleCard";

const CustomerCard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState("table");
  const [searchId, setSearchId] = useState("");
  const [emailStatuses, setEmailStatuses] = useState({}); // New state to manage email statuses

  useEffect(() => {
    axios
      .get("http://localhost:5555/customer")
      .then((response) => {
        setCustomers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  // Function to filter customers based on the search ID
  const filteredCustomers = customers.filter((item) =>
    item.customerName.includes(searchId)
  );

  // Function to update the email status
  const updateEmailStatus = (customerId, status) => {
    setEmailStatuses((prevStatuses) => ({
      ...prevStatuses,
      [customerId]: status,
    }));
  };

  // Placeholder data for customer satisfaction percentages
  const satisfactionData = {
    verySatisfied: 80,
    satisfied: 70,
    neutral: 20,
    unsatisfied: 10,
  };

  // Placeholder data for customer ratings
  const customerRatings = [
    { name: "Oshan Wijekoon", stars: 5 },
    { name: "Nisal Fonseka", stars: 4 },
    { name: "Senura Dinilka", stars: 3 },
    { name: "David Watson", stars: 2 },
    { name: "Binuri Perera", stars: 5 },
  ];

  return (
    <div style={{ display: "flex", backgroundColor: "#ffffff", padding: "20px" }}>
      {/* Main content section */}
      <div style={{ flexGrow: 1 }}>
        

        <br />
        <br />
        <br />

        {/* Search Input */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px 15px",
              width: "350px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
                color: "#000000",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 20l4-4m0 0l4 4m-4-4a8 8 0 118 8 8 8 0 01-8-8z"
              />
            </svg>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search by Customer name :"
              value={searchId}
              onChange={handleSearchChange}
              style={{
                border: "none",
                outline: "none",
                flexGrow: 1,
                fontSize: "16px",
              }}
            />
          </div>
        </div>

        {/* Grid to display filtered customers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
          {filteredCustomers.map((item) => (
            <CustomerSingleCard
              key={item._id}
              customer={item}
              emailStatus={emailStatuses[item._id] || "Pending"} // Get the email status or set it as "Pending"
            />
          ))}
        </div>
      </div>

      {/* Satisfaction Percentage Section */}
      <div
        style={{
          width: "300px",
          marginLeft: "20px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-3xl font-bold" style={{ marginBottom: "20px", textAlign: "center" }}>
          Customer Satisfaction
        </h2>
        <div style={{ fontSize: "18px", lineHeight: "1.6" }}>
          <div style={{ marginBottom: "10px" }}>
            <strong>Very Satisfied:</strong> {satisfactionData.verySatisfied}%
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Satisfied:</strong> {satisfactionData.satisfied}%
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Neutral:</strong> {satisfactionData.neutral}%
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Unsatisfied:</strong> {satisfactionData.unsatisfied}%
          </div>
        </div>

        {/* Customer Ratings Section */}
        <h2 className="text-3xl font-bold" style={{ marginTop: "30px", marginBottom: "20px", textAlign: "center" }}>
          Customer Ratings
        </h2>
        <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
          {customerRatings.map((rating, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{rating.name}:</strong>{" "}
              <span style={{ color: "gold", fontSize: "20px" }}>
                {"★".repeat(rating.stars)}{"☆".repeat(5 - rating.stars)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
