import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';

const ShowRequests = () => {
  const [breakdownRequest, setBreakdownRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/breakdownRequests/${id}`)
      .then((response) => {
        setBreakdownRequest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Breakdown Request</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{breakdownRequest._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer Name</span>
            <span>{breakdownRequest.customerName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Contact Number</span>
            <span>{breakdownRequest.contactNumber}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Vehicle Number</span>
            <span>{breakdownRequest.vehicleNumber}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Location</span>
            <span>{breakdownRequest.location}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Issue Type</span>
            <span>{breakdownRequest.issueType}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Driver Assigned</span>
            <span>{breakdownRequest.assignedDriver}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Total Distance</span>
            <span>{breakdownRequest.totalDistance}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Total Charge</span>
            <span>{breakdownRequest.totalCharge}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(breakdownRequest.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(breakdownRequest.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowRequests;
