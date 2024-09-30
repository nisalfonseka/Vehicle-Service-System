import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './expenses.css'; // Ensure to import the relevant CSS

const CreateExpense = ({ onClose, refreshData, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    type: '',
    description: '',
    paymentMethod: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount || '',
        date: initialData.date || '',
        type: initialData.type || '',
        description: initialData.description || '',
        paymentMethod: initialData.paymentMethod || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
            />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-input"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
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
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            className="form-input"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          />
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
