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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/customer/${id}`)
      .then((response) => {
        const { customerName, email, mobileNumber, vehicleNumber, subject } = response.data;
        setCustomerName(customerName);
        setEmail(email);
        setMobileNumber(mobileNumber);
        setVehicleNumber(vehicleNumber);
        setSubject(subject);
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
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/customer/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Ticket edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while editing the Ticket', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#ffffff' }}>
      <BackButton />
      <h1 style={{ fontSize: '24px', margin: '16px 0', color: '#000000' }}>Edit Ticket</h1>
      {loading && <Spinner />}
      <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          border: '2px solid #000000', 
          borderRadius: '12px', 
          width: '600px', 
          padding: '24px', 
          margin: '0 auto', 
          backgroundColor: '#e0f7fa'  // Light blue background for the form
        }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '18px', marginRight: '16px', color: '#000000' }}>Customer Name :</label>
          <input
            type='text'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{ border: '2px solid #000000', borderRadius: '8px', padding: '8px', width: '100%', color: '#000000', backgroundColor: '#ffe6e6' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '18px', marginRight: '16px', color: '#000000' }}>Email :</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: '2px solid #000000', borderRadius: '8px', padding: '8px', width: '100%', color: '#000000', backgroundColor: '#ffe6e6' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '18px', marginRight: '16px', color: '#000000' }}>Mobile :</label>
          <input
            type='text'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{ border: '2px solid #000000', borderRadius: '8px', padding: '8px', width: '100%', color: '#000000', backgroundColor: '#ffe6e6' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '18px', marginRight: '16px', color: '#000000' }}>Vehicle Registration :</label>
          <input
            type='text'
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={{ border: '2px solid #000000', borderRadius: '8px', padding: '8px', width: '100%', color: '#000000', backgroundColor: '#ffe6e6' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '18px', marginRight: '16px', color: '#000000' }}>Subject :</label>
          <input
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ border: '2px solid #000000', borderRadius: '8px', padding: '30px', width: '100%', color: '#000000', backgroundColor: '#ffe6e6' }}
          />
        </div>
        <button
          onClick={handleEditCustomer}
          style={{ 
            padding: '12px', 
            backgroundColor: '#cc0000', 
            color: '#fff', 
            borderRadius: '8px', 
            margin: '24px 0', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            border: 'none' 
          }}
        >
          Save Customer
        </button>
      </div>
    </div>
  );
}

export default EditCustomer;
