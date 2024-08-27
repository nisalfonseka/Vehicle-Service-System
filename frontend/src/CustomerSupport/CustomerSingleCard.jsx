import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { HiViewGrid } from "react-icons/hi";
import CustomerModal from "./CustomerModal";


const CustomerSingleCard = ({ customer }) => {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-400 rounded-lg">
        {customer.customerName}
      </h2>
      <h4 className="my-2 text-gray-500">{customer._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl " />
        <h2 className="my-1">{customer.email}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <CiCalendarDate className="text-red-300 text-2xl" />
        <h2 className="my-1">{customer.vehicleNumber}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <FaCarAlt className="text-red-300 text-2xl" />
        <h2 className="my-1">{customer.mobileNumber}</h2>
      </div>
      
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
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
        <CustomerModel customer={customer} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default CustomerSingleCard;
