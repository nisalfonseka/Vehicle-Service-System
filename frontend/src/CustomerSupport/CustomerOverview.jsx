import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerModal from "./CustomerModal"; // Assuming you have a CustomerModal component

const CustomerOverview = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5555/customer");
        console.log("Full Response: ", response); // Log the full response object for debugging

        if (response.data && response.data.data) {
          setCustomers(response.data.data);
        } else {
          setErrorMessage("Unexpected response structure");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        setErrorMessage("Error fetching customers.");
        console.error("Error fetching customers:", error); // Log full error object
        console.error("Error details:", error.response || error.message || error);
      }
    };
    fetchCustomers();
  }, []);

  // Callback to update customer when modal closes
  const handleCustomerUpdate = (customerId, updatedFields) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer._id === customerId ? { ...customer, ...updatedFields } : customer
      )
    );
    setSelectedCustomer(null); // Close the modal after updating
    console.log(`Updated customer ${customerId}`); // Debugging: log the update
  };

  // Debugging: Log customers data after updating
  useEffect(() => {
    console.log("Updated Customers Data: ", customers); // Check if customers array is populated correctly
  }, [customers]);

  // Count the number of tickets based on priority (High, Medium, Low)
  const highPriorityCount = customers.filter((customer) => customer.priority === "High").length;
  const mediumPriorityCount = customers.filter((customer) => customer.priority === "Medium").length;
  const lowPriorityCount = customers.filter((customer) => customer.priority === "Low").length;
  const allCustomersCount = customers.length;

  return (
    <div>
      <h1 className="text-3xl font-medium text-black text-center mt-2">Ticket Overview</h1>
      <br />

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p> // Show error message
      )}

      <div className="flex flex-wrap justify-center mx-auto max-w-7xl">
        <style>
          {`
            @keyframes alert {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            .alert-effect {
              animation: alert 0.8s infinite;
            }
          `}
        </style>
        
        {/* High Priority Tickets Card */}
        <div
          className="border border-red-600 rounded-xl p-6 m-2 bg-red-600 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center alert-effect transition"
          onClick={() =>
            setSelectedCustomer(customers.find((customer) => customer.priority === "High"))
          }
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {highPriorityCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            High Priority Tickets
          </h1>
        </div>

        {/* Medium Priority Tickets Card */}
        <div
          className="border border-yellow-500 rounded-xl p-6 m-2 bg-yellow-500 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center transition"
          onClick={() =>
            setSelectedCustomer(customers.find((customer) => customer.priority === "Medium"))
          }
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {mediumPriorityCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            Medium Priority Tickets
          </h1>
        </div>

        {/* Low Priority Tickets Card */}
        <div
          className="border border-green-500 rounded-xl p-6 m-2 bg-green-500 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center transition"
          onClick={() =>
            setSelectedCustomer(customers.find((customer) => customer.priority === "Low"))
          }
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {lowPriorityCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            Low Priority Tickets
          </h1>
        </div>
      </div>

      <br />
      <br />
      <div>
        <h1 className="text-3xl font-medium text-black text-center mt-2">
          All type Ticket Overview
        </h1>
        <br />
        <div className="flex flex-wrap justify-center mx-auto max-w-7xl">
          {/* Total Customers Card */}
          <div
            className="border border-gray-300 rounded-xl p-6 m-2 bg-blue-600 shadow-lg transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center transition"
            style={{ width: "350px", height: "180px" }}
          >
            <h2 className="text-4xl font-semibold text-white text-center">
              {allCustomersCount}
            </h2>
            <h1 className="text-lg font-medium text-white text-center mt-2">
              Total Tickets
            </h1>
          </div>
        </div>
      </div>

      {/* Render modal if a customer is selected */}
      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={(updatedFields) =>
            handleCustomerUpdate(selectedCustomer._id, updatedFields)
          }
        />
      )}
    </div>
  );
};

export default CustomerOverview;
