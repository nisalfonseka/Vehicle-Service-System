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
      <h4 style={{ margin: "8px 0", color: "#808080" }}>{customer._id}</h4>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.email}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <CiCalendarDate className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.vehicleNumber}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FaCarAlt className="text-red-300 text-2xl" />
        <h2 style={{ margin: "4px 0" }}>{customer.mobileNumber}</h2>
      </div>

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
        <Link to={`/customer/details/${customer._id}`}>
          <HiViewGrid className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/customer/edit/${customer._id}`}>
          <MdEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/customer/delete/${customer._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>

      </div>
      {showModel && (
        <CustomerModal customer={customer} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default CustomerSingleCard;
