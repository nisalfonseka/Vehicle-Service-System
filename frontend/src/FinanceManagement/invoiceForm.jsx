import React, { useState } from 'react';
import axios from 'axios';
import './invoice.css'; // Ensure this CSS file exists or adjust the path

const AddInvoiceForm = ({ onAddInvoice, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    invoiceName: '',
    serviceType: '', // Pre-populate with an empty value or a default service
    invoiceDate: '', // Should be in "YYYY-MM-DD" format
    customerName: '',
    billingAddress: '',
    amount: '',
    taxAmount: '',
    discountAmount: '',
    paymentStatus: 'Pending',
    paymentMethod: '',
  });
  const [error, setError] = useState(null);

  const serviceOptions = [
    { value: '', label: 'Select Service Type' },
    { value: 'Wash & Grooming', label: 'Wash & Grooming' },
    { value: 'Lube Services', label: 'Lube Services' },
    { value: 'Engine Tune Ups', label: 'Engine Tune Ups' },
    { value: 'Windscreen Treatments', label: 'Windscreen Treatments' },
    { value: 'Exterior & Interior Detailing', label: 'Exterior & Interior Detailing' },
    { value: 'Inspection Reports', label: 'Inspection Reports' },
    { value: 'Insuarance Claims', label: 'Insuarance Claims' },
    { value: 'Hybrid Services', label: 'Hybrid Services' },
    { value: 'Battery Services', label: 'Battery Services' },
    { value: 'Nano Treatments', label: 'Nano Treatments' },
    { value: 'Full Paints', label: 'Full Paints' },
    { value: 'Wheel Alignment', label: 'Wheel Alignment' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmitPart1 = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitPart2 = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      invoiceDate: formatDate(formData.invoiceDate),
    };

    try {
      const response = await axios.post('http://localhost:5555/invoiceRequests', formattedData);
      onAddInvoice(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred during submission');
    }
  };

  return (
    <div className="add-invoice-form">
      <h2 className="form-title">Add New Invoice</h2>
      {error && <p className="error">{error}</p>}
      {step === 1 && (
        <form onSubmit={handleSubmitPart1}>
          <div className="form-step">
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
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="invoiceDate">Invoice Date (DD/MM/YYYY):</label>
              <input
                type="text"
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
            <div className="form-actions">
              <button type="submit" className="submit-button">Continue</button>
            </div>
          </div>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmitPart2}>
          <div className="form-step">
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
              <button type="button" className="cancel-button" onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddInvoiceForm;
