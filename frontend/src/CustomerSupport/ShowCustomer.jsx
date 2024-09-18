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
      <h1 style={{ fontSize: '2rem', margin: '1rem 0', color: '#2c3e50' }}>Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #1e90ff',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '1.5rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>ID:</span>
            <span>{customer._id}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>Name:</span>
            <span>{customer.customerName}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>Email:</span>
            <span>{customer.email}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>Mobile Number:</span>
            <span>{customer.mobileNumber}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>Vehicle Number:</span>
            <span>{customer.vehicleNumber}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>Message:</span>
            <span>{customer.subject}</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '1rem', color: '#7f8c8d' }}>Date Created:</span>
            <span>{new Date(customer.createdAt).toString()}</span>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ShowCustomer;
