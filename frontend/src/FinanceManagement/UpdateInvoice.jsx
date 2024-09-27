import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './invoice.css';

const EditInvoiceForm = ({ invoice, onUpdateInvoice, onClose }) => {
  const [formData, setFormData] = useState({
    invoiceName: '',
    serviceType: '',
    invoiceDate: '',
    customerName: '',
    billingAddress: '',
    amount: '',
    taxAmount: '',
    discountAmount: '',
    paymentStatus: 'Pending',
    paymentMethod: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pre-fill the form data with the current invoice data
    if (invoice) {
      setFormData({
        invoiceName: invoice.invoiceName || '',
        serviceType: invoice.serviceType || '',
        invoiceDate: new Date(invoice.invoiceDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD
        customerName: invoice.customerName || '',
        billingAddress: invoice.billingAddress || '',
        amount: invoice.amount || '',
        taxAmount: invoice.taxAmount || '',
        discountAmount: invoice.discountAmount || '',
        paymentStatus: invoice.paymentStatus || 'Pending',
        paymentMethod: invoice.paymentMethod || '',
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the PUT request to update the invoice
      const response = await axios.put(`http://localhost:5555/invoiceRequests/${invoice._id}`, formData);
      onUpdateInvoice(response.data); // Pass updated invoice data to parent component
      onClose(); // Close the modal after successful update
    } catch (err) {
      console.error("Error updating invoice:", err.response?.data);
      setError(err.response?.data?.message || "Error occurred during update");
    }
  };

  return (
    <div className="edit-invoice-form">
      <h2>Edit Invoice</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="invoice-form-grid">
        <div className="form-group">
          <label htmlFor="invoiceName">Invoice Name:</label>
          <input
            type="text"
            id="invoiceName"
            name="invoiceName"
            value={formData.invoiceName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceType">Service Type:</label>
          <input
            type="text"
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input
            type="date"
            id="invoiceDate"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address:</label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taxAmount">Tax Amount:</label>
          <input
            type="number"
            id="taxAmount"
            name="taxAmount"
            value={formData.taxAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discountAmount">Discount Amount:</label>
          <input
            type="number"
            id="discountAmount"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentStatus">Payment Status:</label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Update Invoice</button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoiceForm;
