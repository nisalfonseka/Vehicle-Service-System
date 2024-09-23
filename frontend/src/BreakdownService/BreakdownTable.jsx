import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import axios from 'axios'; // Ensure axios is imported

const BreakdownTable = () => {
  const [breakdownRequests, setBreakdownRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/breakdownRequests')
      .then((response) => {
        setBreakdownRequests(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table
      className='w-full border-separate border-spacing-2'
      style={{ borderCollapse: 'separate', borderSpacing: '8px', backgroundColor: '#f8f9fa' }}
    >
      <thead>
        <tr>
          <th
            className='border border-slate-600 rounded-md'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            No
          </th>
          <th
            className='border border-slate-600 rounded-md'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Customer Name
          </th>
          <th
            className='border border-slate-600 rounded-md max-md:hidden'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Contact Number
          </th>
          <th
            className='border border-slate-600 rounded-md'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Vehicle Number
          </th>
          <th
            className='border border-slate-600 rounded-md'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Location
          </th>
          <th
            className='border border-slate-600 rounded-md'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Issue Type
          </th>
          <th
            className='border border-slate-600 rounded-md'
            style={{
              padding: '12px',
              backgroundColor: '#ff0038',
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {breakdownRequests.map((breakdownRequest, index) => (
          <tr
            key={breakdownRequest._id}
            className='h-8'
            style={{
              backgroundColor: index % 2 === 0 ? '#e9ecef' : '#f8f9fa',
            }}
          >
            <td
              className='border border-slate-700 rounded-md text-center'
              style={{ padding: '10px', color: '#495057' }}
            >
              {index + 1}
            </td>
            <td
              className='border border-slate-700 rounded-md text-center'
              style={{ padding: '10px', color: '#495057' }}
            >
              {breakdownRequest.customerName}
            </td>
            <td
              className='border border-slate-700 rounded-md text-center max-md:hidden'
              style={{ padding: '10px', color: '#495057' }}
            >
              {breakdownRequest.contactNumber}
            </td>
            <td
              className='border border-slate-700 rounded-md text-center max-md:hidden'
              style={{ padding: '10px', color: '#495057' }}
            >
              {breakdownRequest.vehicleNumber}
            </td>
            <td
              className='border border-slate-700 rounded-md text-center max-md:hidden'
              style={{ padding: '10px', color: '#495057' }}
            >
              {breakdownRequest.location}
            </td>
            <td
              className='border border-slate-700 rounded-md text-center max-md:hidden'
              style={{ padding: '10px', color: '#495057' }}
            >
              {breakdownRequest.issueType}
            </td>
            <td
              className='border border-slate-700 rounded-md text-center max-md:hidden'
              style={{ padding: '10px', color: '#495057' }}
            >
              <div className='flex justify-center gap-x-4'>
                <Link to={`/breakdownRequests/details/${breakdownRequest._id}`}>
                  <BsInfoCircle
                    className='text-2xl text-green-800'
                    style={{ cursor: 'pointer', transition: 'color 0.3s' }}
                  />
                </Link>
                <Link to={`/breakdownRequests/edit/${breakdownRequest._id}`}>
                  <AiOutlineEdit
                    className='text-2xl text-yellow-600'
                    style={{ cursor: 'pointer', transition: 'color 0.3s' }}
                  />
                </Link>
                <Link to={`/breakdownRequests/delete/${breakdownRequest._id}`}>
                  <AiOutlineDelete
                    className='text-2xl text-red-600'
                    style={{ cursor: 'pointer', transition: 'color 0.3s' }}
                  />
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
