import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddInvoiceForm from './invoiceForm.jsx';
import EditInvoiceForm from './UpdateInvoice.jsx';
import Modal from 'react-modal';
import './invoice.css';
import Navbar from './Navbar';
import { FaSearch } from 'react-icons/fa';
Modal.setAppElement('#root');

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

 
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/invoiceRequests');
      const updatedInvoices = response.data.data.map((invoice) => ({
        ...invoice,
        calculatedTotalAmount: (invoice.amount ?? 0) + (invoice.taxAmount ?? 0) - (invoice.discountAmount ?? 0),
      }));
      setInvoices(updatedInvoices);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInvoice = async (newInvoice) => {
    try {
      const response = await axios.post('http://localhost:5555/invoiceRequests', newInvoice);
      if (response.status === 201) {
        const createdInvoice = {
          ...newInvoice,
          _id: response.data._id,  // Assuming your backend returns the new ID
          calculatedTotalAmount: (newInvoice.amount ?? 0) + (newInvoice.taxAmount ?? 0) - (newInvoice.discountAmount ?? 0),
        };
        setInvoices((prevInvoices) => [...prevInvoices, createdInvoice]); // Optimistically update the state
        setModalIsOpen(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateInvoice = async (updatedInvoice) => {
    try {
      const response = await axios.put(`http://localhost:5555/invoiceRequests/${updatedInvoice._id}`, updatedInvoice);
      if (response.status === 200) {
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice._id === updatedInvoice._id
              ? {
                  ...updatedInvoice,
                  calculatedTotalAmount: (updatedInvoice.amount ?? 0) + (updatedInvoice.taxAmount ?? 0) - (updatedInvoice.discountAmount ?? 0),
                }
              : invoice
          )
        );
        setEditModalIsOpen(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (invoice) => {
    setCurrentInvoice(invoice);
    setEditModalIsOpen(true);
  };

  const handleDeleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/invoiceRequests/${id}`);
      setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchInvoices();
  }, []); // Fetch invoices only once when the component mounts


  const generatePDF = (invoice) => {
    
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Invoice: ${invoice.invoiceName}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Customer: ${invoice.customerName}`, 10, 20);
    doc.text(`Service: ${invoice.serviceType}`, 10, 30);
    doc.text(`Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, 10, 40);
   
    doc.autoTable({
      startY: 50,
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontSize: 12 },
      bodyStyles: { fontSize: 10 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      head: [['Description', 'Amount']],
      body: [
        ['Amount', `Rs. ${(invoice.amount ?? 0).toFixed(2)}`],
        ['Tax Amount', `Rs. ${(invoice.taxAmount ?? 0).toFixed(2)}`],
        ['Discount Amount', `Rs. ${(invoice.discountAmount ?? 0).toFixed(2)}`],
        ['Final Amount', `Rs. ${(invoice.calculatedTotalAmount ?? 0).toFixed(2)}`],
        ['Payment Status', invoice.paymentStatus],
      ],
      margin: { top: 60 },
      theme: 'striped',
    });

   
    doc.text('Thank you! Come Again!', 80, doc.autoTable.previous.finalY + 10);

    doc.save(`${invoice.invoiceName.replace(/\s+/g, '_')}_Invoice.pdf`);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="invoice-list">
      <Navbar />
      <h1 className="text-4xl my-8">Ashan Auto Service</h1>
      <h3 className="text-2xl my-9">Invoice List</h3>
      <button onClick={() => setModalIsOpen(true)} className="add-button">Add Invoice</button>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Invoices..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <FaSearch className="search-icon" />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Invoice"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add New Invoice</h2>
        <AddInvoiceForm onAddInvoice={handleAddInvoice} onClose={() => setModalIsOpen(false)} />
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit Invoice"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Invoice</h2>
        {currentInvoice && (
          <EditInvoiceForm
            invoice={currentInvoice}
            onUpdateInvoice={handleUpdateInvoice}
            onClose={() => setEditModalIsOpen(false)}
          />
        )}
      </Modal>

      {filteredInvoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <div className="invoice-card-container">
          {filteredInvoices.map((invoice) => (
            <div key={invoice._id} className="invoice-card">
              <h3 className="invoice-title">{invoice.invoiceName}</h3>
              <p><strong>Service Type:</strong> {invoice.serviceType}</p>
              <p><strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
              <p><strong>Customer Name:</strong> {invoice.customerName}</p>
              <p><strong>Billing Address:</strong> {invoice.billingAddress}</p>
              <p><strong>Amount:</strong> Rs.{(invoice.amount ?? 0).toFixed(2)}</p>
              <p><strong>Tax Amount:</strong> Rs.{(invoice.taxAmount ?? 0).toFixed(2)}</p>
              <p><strong>Discount Amount:</strong> Rs.{(invoice.discountAmount ?? 0).toFixed(2)}</p>
              <p><strong>Final Amount:</strong> Rs.{(invoice.calculatedTotalAmount ?? 0).toFixed(2)}</p>
              <p><strong>Payment Status:</strong> {invoice.paymentStatus}</p>
              <div className="invoice-card-actions">
                <button className="edit-button" onClick={() => handleEditClick(invoice)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteInvoice(invoice._id)}>Delete</button>
                <button className="generate-button" onClick={() => generatePDF(invoice)}>Download PDF</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
