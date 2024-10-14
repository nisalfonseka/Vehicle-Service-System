import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateExpense = ({ onClose, refreshData, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Set default to today
    description: '',
    paymentMethod: 'Cash', // Default payment method
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateError, setDateError] = useState(null); // State for date validation

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount || '',
        date: initialData.date || new Date().toISOString().split('T')[0], // Set to today if initialData doesn't have date
        description: initialData.description || '',
        paymentMethod: initialData.paymentMethod || 'Cash', // Default to Cash if not provided
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is for the title, restrict it to letters and spaces only
    if (name === 'title') {
      const filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Allow only letters and spaces
      setFormData((prevData) => ({
        ...prevData,
        [name]: filteredValue,
      }));
    } else if (name === 'date') {
      // Validate date to ensure it is not in the future
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to the start of the day for accurate comparison

      if (selectedDate > today) {
        setDateError('Date cannot be in the future.'); // Set an error message if date is in the future
      } else {
        setDateError(null); // Clear the error if date is valid
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prevent submission if there is a date error
    if (dateError) {
      setLoading(false);
      return;
    }

    try {
      if (initialData) {
        // Update existing expense request
        await axios.put(`http://localhost:5555/expenseRequests/${initialData._id}`, formData);
      } else {
        // Create new expense request
        await axios.post('http://localhost:5555/expenseRequests', formData);
      }

      refreshData();
      onClose();
    } catch (err) {
      console.error('Error submitting form:', err); // Log the error for debugging
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // Soft background color
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          maxWidth: '500px',
          width: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          {initialData ? 'Edit Expense' : 'Add Expense'}
        </h2>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', color: '#333' }}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outline: 'none',
              color: 'black', // Set text color to black
              transition: 'border-color 0.3s ease',
            }}
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="amount" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', color: '#333' }}>
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                outline: 'none',
                color: 'black', // Set text color to black
                transition: 'border-color 0.3s ease',
              }}
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={{ flex: '1' }}>
            <label htmlFor="date" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', color: '#333' }}>
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                outline: 'none',
                color: 'black', // Set text color to black
                transition: 'border-color 0.3s ease',
              }}
              value={formData.date}
              onChange={handleInputChange}
              required
              max={new Date().toISOString().split('T')[0]} // Limit to today
            />
            {dateError && <p style={{ color: 'red', fontSize: '12px' }}>{dateError}</p>}
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', color: '#333' }}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outline: 'none',
              color: 'black', // Set text color to black
              transition: 'border-color 0.3s ease',
              minHeight: '80px',
            }}
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="paymentMethod" style={{ marginBottom: '8px', display: 'block', fontSize: '14px', color: '#333' }}>
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              outline: 'none',
              color: 'black', // Set text color to black
              transition: 'border-color 0.3s ease',
            }}
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '10px 15px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              padding: '10px 15px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpense;
