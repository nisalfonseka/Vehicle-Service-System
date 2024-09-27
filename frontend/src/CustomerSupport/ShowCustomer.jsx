import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';

const ShowCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/customer/${id}`)
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <BackButton />
      <h1 style={{ fontSize: '2rem', margin: '1rem 0', color: '#000000' }}>Ticket Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #e74c3c', // Red border
          borderRadius: '10px',
          width: 'fit-content',
          padding: '1.5rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fdecea' // Light red background
        }}>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}> Customer ID:</span>
            <span>{customer.customer_id}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}> Customer Name:</span>
            <span>{customer.customerName}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}>Email:</span>
            <span>{customer.email}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}>Mobile Number:</span>
            <span>{customer.mobileNumber}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}>Vehicle Number:</span>
            <span>{customer.vehicleNumber}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}>Subject:</span>
            <span>{customer.subject}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#000000' }}>Date Created:</span>
            <span>{new Date(customer.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCustomer;
