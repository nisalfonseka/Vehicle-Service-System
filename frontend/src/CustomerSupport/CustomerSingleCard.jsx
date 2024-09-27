import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from 'react-icons/bs';
import { CiCalendarDate } from "react-icons/ci";
import { FaCarAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { HiViewGrid } from "react-icons/hi";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import CustomerModal from "./CustomerModal";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Import PDFDownloadLink
import CustomerReport from "../CustomerSupport/CustomerReport"; // Import the report component

const CustomerSingleCard = ({ customer }) => {
  const [showModel, setShowModel] = useState(false);
  const [emailStatus, setEmailStatus] = useState(() => {
    // Fetch email status from local storage if it exists, otherwise default to "Pending"
    return localStorage.getItem(`emailStatus_${customer.customer_id}`) || "Pending";
  });

  const handleModalClose = (status) => {
    setShowModel(false);
    if (status) {
      setEmailStatus(status); // Update the status
      // Store the email status in local storage
      localStorage.setItem(`emailStatus_${customer.customer_id}`, status);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff ", // White background
        color: "#000000", // Black font color
        border: "2px solid #808080", // Gray border to match the existing design
        borderRadius: "10px",
        padding: "16px",
        margin: "16px",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
      }}
    >
      <h2
        style={{
          position: "absolute",
          top: "8px",
          right: "16px",
          padding: "4px 8px",
          backgroundColor: "#f44336", // Red background for the customer name
          borderRadius: "8px",
        }}
      >
        {customer.customerName}
      </h2>
      <h4 style={{ margin: "8px 0", color: "#808080" }}>{customer.customer_id}</h4>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.email}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <CiCalendarDate className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.mobileNumber}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FaCarAlt className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.vehicleNumber}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <CiCalendarDate className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.subject}</h2>
      </div>

      {/* Display the email status */}
      {emailStatus && (
        <div className="mt-2">
          <p className={`text-${emailStatus === 'Success' ? 'green' : emailStatus === 'Pending' ? 'orange' : 'red'}-500 font-semibold`}>
            Ticket Status: {emailStatus}
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          padding: "16px",
        }}
      >
        <GiConfirmed
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModel(true)}
        />
        <Link to={`/dashboard/customer/details/${customer._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/dashboard/customer/edit/${customer._id}`}>
          <MdEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <PDFDownloadLink
          document={<CustomerReport customer={customer} />}
          fileName={`${customer.customerName}_Report.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button style={{ fontWeight: "bold", color: "#696969" }}>Loading...</button>
            ) : (
              <button style={{ fontWeight: "bold", color: "#0000FF" }}>Report</button>
            )
          }
        </PDFDownloadLink>
        <Link to={`/dashboard/customer/delete/${customer._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
      {showModel && (
        <CustomerModal customer={customer} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default CustomerSingleCard;
