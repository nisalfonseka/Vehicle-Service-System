import React, { useState, useEffect } from 'react';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditRequest = () => {
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/breakdownRequests/${id}`)
    .then((response) => {
        setCustomerName(response.data.customerName);
        setContactNumber(response.data.contactNumber)
        setVehicleNumber(response.data.vehicleNumber)
        setLocation(response.data.location)
        setIssueType(response.data.issueType)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditRequest = () => {
    const data = {
      customerName,
      contactNumber,
      vehicleNumber,
      location,
      issueType,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/breakdownRequests/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('breakdown request Edited successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Breakdown Request</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Customer Name</label>
          <input
            type='text'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Contact Number</label>
          <input
            type='number'
            value={contactNumber}
            //onChange={(e) => setCustomerNumber(Number(e.target.value))}
            onChange={(e) => setContactNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Vehicle Number</label>
          <input
            type='text'
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Location</label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Issue Type</label>
          <input
            type='text'
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditRequest}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditRequest