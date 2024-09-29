import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex justify-center py-2.5">
      {Array.from({ length: 5 }, (_, index) => index + 1).map(star => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(rating)}
          className={`text-[24px] cursor-pointer ${star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5555/customer");
        const allCustomers = response.data.data;
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        const username = loggedInUser ? loggedInUser.username : null;
        const userCustomers = allCustomers.filter(customer => customer.customerName === username);
        setCustomers(allCustomers);
        setFilteredCustomers(userCustomers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <table className="min-w-full bg-white border shadow-md rounded-lg overflow-hidden">
        <thead className="bg-red-600 text-white">
          <tr>
            {['Customer ID', 'Customer Name', 'Email', 'Mobile Number', 'Vehicle Number', 'Subject', 'Category', 'Priority', 'Estimated Time', 'Ticket Status', 'Operations'].map((header, idx) => (
              <th key={idx} className="p-2 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => {
            const emailStatus = localStorage.getItem(`emailStatus_${customer.customer_id}`) || "";
            return (
              <tr key={customer._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} h-[50px] border-b border-red-700`}>
                <td className="text-center text-black border border-red-700">{index + 1}</td>
                <td className="text-center text-black border border-red-700">{customer.customerName}</td>
                <td className="text-center text-black border border-red-700 hidden md:table-cell">{customer.email}</td>
                <td className="text-center text-black border border-red-700 hidden md:table-cell">{customer.mobileNumber}</td>
                <td className="text-center text-black border border-red-700">{customer.vehicleNumber}</td>
                <td className="text-center text-black border border-red-700">{customer.subject}</td>
                <td className="text-center text-black border border-red-700">{customer.category}</td>
                <td className="text-center text-black border border-red-700">{customer.priority}</td>
                <td className="text-center text-black border border-red-700">{customer.estimatedTime}</td>
                <td className="text-center text-black border border-red-700">
                  {emailStatus ? (
                    <span className={`text-${emailStatus === 'Success' ? 'green' : 'red'}-500`}>
                      {emailStatus}
                    </span>
                  ) : (
                    "Pending..."
                  )}
                </td>
                <td className="text-center text-black border border-red-600">
                  <div className="flex justify-center gap-4">
                    <Link to={`/customer/details/${customer._id}`}>
                      <BsInfoCircle className="text-[24px] text-green-800" />
                    </Link>
                    <Link to={`/customer/edit/${customer._id}`}>
                      <AiOutlineEdit className="text-[24px] text-yellow-600" />
                    </Link>
                    <Link to={`/customer/delete/${customer._id}`}>
                      <MdOutlineDelete className="text-[24px] text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CustomerTable;
