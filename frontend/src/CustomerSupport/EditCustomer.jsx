import React, { useState, useEffect } from 'react';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCustomer = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/customer/${id}`)
      .then((response) => {
        const { customerName, email, mobileNumber, vehicleNumber, subject, category, priority, estimatedTime } = response.data;
        setCustomerName(customerName);
        setEmail(email);
        setMobileNumber(mobileNumber);
        setVehicleNumber(vehicleNumber);
        setSubject(subject);
        setCategory(category);
        setPriority(priority);
        setEstimatedTime(estimatedTime);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while fetching customer details', { variant: 'error' });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditCustomer = () => {
    const data = {
      customerName,
      email,
      mobileNumber,
      vehicleNumber,
      subject,
      category,
      priority,
      estimatedTime,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/customer/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Ticket edited successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while editing the Ticket', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className="p-4 bg-white">
      <BackButton />
      <h1 className="text-2xl my-4 text-black">Edit Ticket</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-black rounded-xl w-[600px] p-6 mx-auto bg-cyan-100">
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Customer Name :</label>
          <input
            type='text'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Email :</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Mobile :</label>
          <input
            type='text'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Vehicle Registration :</label>
          <input
            type='text'
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Subject :</label>
          <input
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Category :</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          >
            <option value="">Select Category</option>
            <option value="Service Booking">Service Booking</option>
            <option value="Breakdown Service">Breakdown Service</option>
            <option value="Online Store">Online Store</option>
            <option value="Sign up Issues">Sign up Issues</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Priority :</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-red-100"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-lg mr-4 text-black">Estimated Time :</label>
          <input
            type='text'
            value={estimatedTime}
            readOnly
            className="border-2 border-black rounded-lg p-2 w-full text-black bg-gray-200"
          />
        </div>
        <button
          onClick={handleEditCustomer}
          className="p-3 bg-red-600 text-white rounded-lg mt-6 font-bold cursor-pointer"
        >
          Save Customer
        </button>
      </div>
    </div>
  );
}

export default EditCustomer;
