import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { FaCarAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { HiViewGrid } from "react-icons/hi";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import CustomerModal from "./CustomerModal";

const CustomerSingleCard = ({ customer }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#E9ECEE", // White background
        color: "#000000", // Black font color
        border: "2px solid #808080", // Gray border to match the existing design
        borderRadius: "10px",
        padding: "16px",
        margin: "16px",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
      }}
    >
      {/* Ensure customer data exists before rendering */}
      {customer && customer.customerName && (
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
      )}

      <h4 style={{ margin: "8px 0", color: "#808080" }}>{customer?._id}</h4>

      {/* Customer Email */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#e57373", fontSize: "24px" }}>
          <BiUserCircle />
        </span>
        <h2 style={{ margin: "4px 0" }}>{customer?.email}</h2>
      </div>

      {/* Customer Vehicle Number */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#e57373", fontSize: "24px" }}>
          <CiCalendarDate />
        </span>
        <h2 style={{ margin: "4px 0" }}>{customer?.vehicleNumber}</h2>
      </div>

      {/* Customer Mobile Number */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#e57373", fontSize: "24px" }}>
          <FaCarAlt />
        </span>
        <h2 style={{ margin: "4px 0" }}>{customer?.mobileNumber}</h2>
      </div>

      {/* Action Buttons */}
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
          style={{ fontSize: "30px", color: "#1E88E5", cursor: "pointer" }}
          onClick={() => setShowModel(true)}
        />
        <Link to={`/support/details/${customer?._id}`}>
          <HiViewGrid style={{ fontSize: "24px", color: "#43A047" }} />
        </Link>
        <Link to={`/support/edit/${customer?._id}`}>
          <MdEdit style={{ fontSize: "24px", color: "#FBC02D" }} />
        </Link>
        <Link to={`/support/delete/${customer?._id}`}>
          <MdOutlineDelete style={{ fontSize: "24px", color: "#E53935" }} />
        </Link>
      </div>

      {/* Modal for Confirmation */}
      {showModel && (
        <CustomerModal customer={customer} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default CustomerSingleCard;
