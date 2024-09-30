import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const BreakdownTable = ({ breakdownRequests, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">

      <thead className="bg-red-600 text-white">
            <tr>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">No</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Customer Name</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Contact Number</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Vehicle Number</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Location</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Issue Type</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Assigned Driver</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Status</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Operations</th>

            </tr>
          </thead>
      {/* <thead className="bg-red-600">
        <tr>
          <th className="text-white">No</th>
          <th className="text-white">Customer Name</th>
          <th className="text-white">Contact Number</th>
          <th className="text-white">Vehicle Number</th>
          <th className="text-white">Location</th>
          <th className="text-white">Issue Type</th>
          <th className="text-white">Assigned Driver</th>
          <th className="text-white">Status</th>
          <th className="text-white">Operations</th>
        </tr>
      </thead> */}
      <tbody>
        {breakdownRequests.map((request, index) => (
          <tr className="even:bg-gray-100 odd:bg-white transition duration-200 hover:bg-gray-200" key={request._id}>
            <td>{index + 1}</td>
            <td>{request.customerName}</td>
            <td>{request.contactNumber}</td>
            <td>{request.vehicleNumber}</td>
            <td>{request.location}</td>
            <td>{request.issueType}</td>
            <td>{request.assignedDriver || 'Not Assigned'}</td>
            <td>{request.status || 'Pending'}</td>
            <td className="border-b border-gray-300 p-4 text-left">
              <div className="flex justify-start gap-x-4">
                <Link to={`/breakdownRequests/details/${request._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/breakdownRequests/edit/${request._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/breakdownRequests/delete/${request._id}`}>
                  <AiOutlineDelete className="text-2xl text-red-600"/>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BreakdownTable;
