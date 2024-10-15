import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSingleCard from "./CustomerSingleCard";

const CustomerCard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [ticketFilter, setTicketFilter] = useState(localStorage.getItem("ticketFilter") || "all"); // Get filter from local storage

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

  // Function to filter customers based on the search ID (either customer name or customer ID) and ticket status
  const filteredCustomers = customers
    .filter((item) =>
      item.customerName.toLowerCase().includes(searchId.toLowerCase()) ||
      item.customer_id.toString().toLowerCase().includes(searchId.toLowerCase()) 
    )
    .filter((item) => {
      const emailStatus = localStorage.getItem(`emailStatus_${item.customer_id}`) || "Pending"; // Fetch email status from local storage
      if (ticketFilter === "all") return true;
      return emailStatus === ticketFilter; // Filter based on email status
    });

  // Function to handle ticket status filter and save it to local storage
  const handleTicketFilterChange = (status) => {
    setTicketFilter(status);
    localStorage.setItem("ticketFilter", status); // Store status in local storage
  };

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
              placeholder="Search by Customer name or ID:"
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

        {/* Filter Buttons for Ticket Status */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            style={{
              backgroundColor: ticketFilter === "all" ? "#1e40af" : "#ccc",
              color: "#fff",
              padding: "10px 15px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => handleTicketFilterChange("all")}
          >
            All
          </button>
          <button
            style={{
              backgroundColor: ticketFilter === "Pending" ? "#eab308" : "#ccc",
              color: "#fff",
              padding: "10px 15px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => handleTicketFilterChange("Pending")}
          >
            Pending Tickets
          </button>
          <button
            style={{
              backgroundColor: ticketFilter === "Success" ? "#4CAF50" : "#ccc",
              color: "#fff",
              padding: "10px 15px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => handleTicketFilterChange("Success")}
          >
            Accepted Tickets
          </button>
          <button
            style={{
              backgroundColor: ticketFilter === "Unsuccess" ? "#dc2626" : "#ccc",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => handleTicketFilterChange("Unsuccess")}
          >
            Failed Tickets
          </button>
        </div>

        {/* Grid to display filtered customers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredCustomers.map((item) => (
              <CustomerSingleCard
                key={item._id}
                customer={item}
              />
            ))
          )}
        </div>
      </div>

      {/* Customer Satisfaction and Ratings Section can go here if needed */}
    </div>
  );
};

export default CustomerCard;
