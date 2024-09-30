import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';

const BreakdownTable = ({ breakdownRequests, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table
      className='w-full border-separate border-spacing-2'
      style={{ borderCollapse: 'separate', borderSpacing: '8px', backgroundColor: '#E53935' }}
    >
      <thead>
        <tr>
        <th style={{ color: 'white' }}>No</th>
          <th style={{ color: 'white' }}>Customer Name</th>
          <th style={{ color: 'white' }}>Contact Number</th>
          <th style={{ color: 'white' }}>Vehicle Number</th>
          <th style={{ color: 'white' }}>Location</th>
          <th style={{ color: 'white' }}>Issue Type</th>
          <th style={{ color: 'white' }}>Assigned Driver</th>
          <th style={{ color: 'white' }}>Status</th>
          <th style={{ color: 'white' }}>Operations</th>
        </tr>
      </thead>
      <tbody>
        {breakdownRequests.map((request, index) => (
          <tr key={request._id}>
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
