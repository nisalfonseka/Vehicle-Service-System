import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './expenses.css'; // Ensure to import the relevant CSS

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
    <div className="form-container">
      <form onSubmit={handleSubmit} className="expense-form">
        <h2 className="form-title">{initialData ? 'Edit Expense' : 'Add Expense'}</h2>

        <div className="form-row">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-row">
          <div className="form-row">
            <label className="form-label" htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-input"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
              required
              max={new Date().toISOString().split('T')[0]} // Limit to today
            />
            {dateError && <p className="error-text">{dateError}</p>} {/* Display date error */}
          </div>
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="form-input"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            {/* Add more payment options as needed */}
          </select>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExpense;
