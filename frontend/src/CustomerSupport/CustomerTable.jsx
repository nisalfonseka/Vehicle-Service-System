import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from 'axios';
import CustomerReport from "../CustomerSupport/CustomerReport";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
      {Array.from({ length: 5 }, (_, index) => index + 1).map(star => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: star <= (hover || rating) ? "#FFD700" : "#E0E0E0" // Gold for selected, light gray for unselected
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

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

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>;
  }

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#ffffff" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}> Customer ID</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Customer Name</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }} className='max-md:hidden'>
              Email
            </th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }} className='max-md:hidden'>
              Mobile Number
            </th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Vehicle Number</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Subject</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Category</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Priority</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Estimated Time</th>
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Ticket Status</th> {/* New Column */}
            <th style={{ padding: "10px", backgroundColor: "#ff0000", color: "#000000", border: "1px solid #cc0000" }}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            const emailStatus = localStorage.getItem(`emailStatus_${customer.customer_id}`) || ""; // Fetch email status from local storage

            return (
              <tr
                key={customer._id}
                style={{
                  height: "50px",
                  backgroundColor: index % 2 === 0 ? "#f8d7da" : "#ffffff", // Light red and white alternating rows
                  borderBottom: "1px solid #cc0000"
                }}
              >
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {index + 1}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {customer.customerName}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }} className='max-md:hidden'>
                  {customer.email}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }} className='max-md:hidden'>
                  {customer.mobileNumber}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {customer.vehicleNumber}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {customer.subject}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {customer.category} {/* Display the new category field */}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {customer.priority} {/* Display the new priority field */}
                </td>
                <td style={{ textAlign: "center", color: "#000000", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {customer.estimatedTime} {/* Display the new estimatedTime field */}
                </td>
                <td style={{ textAlign: "center", color: "#008000 ", fontWeight: "bold", border: "1px solid #cc0000" }}>
                  {emailStatus ? (
                    <span className={`text-${emailStatus === 'Success' ? 'green' : 'red'}-500 font-semibold`}>
                      {emailStatus}
                    </span>
                  ) : (
                    "Pending..." // Default text if no status is found
                  )}
                </td>
                <td style={{ textAlign: "center", color: "#000000", border: "1px solid #cc0000" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                    <Link to={`/customer/details/${customer._id}`}>
                      <BsInfoCircle style={{ fontSize: "24px", color: "#6600FF" }} />
                    </Link>
                    <Link to={`/customer/edit/${customer._id}`}>
                      <AiOutlineEdit style={{ fontSize: "24px", color: "#000000" }} />
                    </Link>
                    <PDFDownloadLink document={<CustomerReport customer={customer} />} fileName="FORM">
                      {({ loading }) =>
                        loading ? (
                          <button style={{ fontWeight: "bold", color: "#696969" }}>Loading...</button>
                        ) : (
                          <button style={{ fontWeight: "bold", color: "#0000FF" }}>Report</button>
                        )
                      }
                    </PDFDownloadLink>
                    <Link to={`/customer/delete/${customer._id}`}>
                      <MdOutlineDelete style={{ fontSize: "24px", color: "#ff0000" }} />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", borderTop: "2px solid #cc0000", paddingTop: "10px" }}>
        <h3 style={{ textAlign: "center", color: "#000000" }}>Rate the Customer Service</h3>
        <StarRating />
      </div>
    </>
  );
};

export default CustomerTable;
