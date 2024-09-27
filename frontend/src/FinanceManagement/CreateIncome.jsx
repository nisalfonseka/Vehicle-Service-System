import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../FinanceManagement/Income.css'; // Import CSS for styling

const CreateIncome = ({ onClose, refreshData, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    type: '',
    description: '',
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
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (initialData) {
        await axios.put(`http://localhost:5555/incomeRequests/${initialData._id}`, formData);
      } else {
        await axios.post('http://localhost:5555/incomeRequests', formData);
      }

      refreshData();
      onClose();
    } catch (err) {
      setError('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2 className="form-title">{initialData ? 'Edit Income' : 'Add Income'}</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? 'Submitting...' : initialData ? 'Update Income' : 'Add Income'}
          </button>
          {error && <p className="error-message">{error}</p>}
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIncome;
