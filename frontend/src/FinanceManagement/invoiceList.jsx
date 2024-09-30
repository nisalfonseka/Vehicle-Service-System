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
import logo from '../FinanceManagement/AaaaAuto (1).png';


Modal.setAppElement('#root');

const toBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Helps with CORS if loading images from a URL
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = reject;
    img.src = url;
  });
};



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
        console.log("Response from server:", response.data);
        if (response.status === 201) {
            const createdInvoice = {
                ...newInvoice,
                _id: response.data._id,
                calculatedTotalAmount: (newInvoice.amount ?? 0) + (newInvoice.taxAmount ?? 0) - (newInvoice.discountAmount ?? 0),
            };
            console.log("Invoice added:", createdInvoice);
            console.log("Invoices before update:", invoices); // Log current state
            setInvoices((prevInvoices) => [...prevInvoices, createdInvoice]);
            console.log("Invoices after update:", [...invoices, createdInvoice]); // Log new state
            setModalIsOpen(false);
            fetchInvoices();
        }
    } catch (err) {
        console.error("Error adding invoice:", err.message);
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
    console.log("Editing invoice:", invoice); // Log the invoice being edited
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

// toBase64 method remains the same

const generatePDF = async (invoice) => {
  const doc = new jsPDF();
  
  try {
    // Use the correct path for the logo
    const logoBase64 = await toBase64(logo); // Adjust the path based on your structure
    console.log(logoBase64); // Check if base64 string is generated correctly

    // Define logo dimensions
    const logoWidth = 50; // Adjust as necessary
    const logoHeight = 20; // Adjust as necessary

    // Calculate x position to center the logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPosition = (pageWidth - logoWidth) / 2;

    // Add the logo to the PDF at the calculated position
    doc.addImage(logoBase64, 'PNG', xPosition, 10, logoWidth, logoHeight); // Adjust y position if necessary
  } catch (err) {
    console.error('Error loading logo:', err);
  }

  // Move text down to avoid overlap with the logo
  doc.setFontSize(18);
  doc.text(`Invoice: ${invoice.invoiceName}`, 10, 40);
  doc.setFontSize(12);
  doc.text(`Customer: ${invoice.customerName}`, 10, 50);
  doc.text(`Service: ${invoice.serviceType}`, 10, 60);
  doc.text(`Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, 10, 70);

  // Create the invoice table
  doc.autoTable({
    startY: 80,  // Start below the logo and text
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

  // Add final text at the bottom
  doc.text('Thank you! Come Again!', 80, doc.autoTable.previous.finalY + 10);

  // Save the PDF with the invoice name
  doc.save(`${invoice.invoiceName.replace(/\s+/g, '_')}_Invoice.pdf`);
};


  

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="invoice-list">
      <Navbar />
      <h1 className="text-4xl my-8"><b>Ashan Auto Service</b></h1>
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
        isOpen={modalIsOpen} // Check if the modal state is updating correctly
        onRequestClose={() => setModalIsOpen(false)} // Close the modal on request
        contentLabel="Add Invoice"
        style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // You can use default overlay styles
            content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)' }, // Default center alignment
        }}
      >
      <AddInvoiceForm onAddInvoice={handleAddInvoice} onClose={() => setModalIsOpen(false)} />
      </Modal>


      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit Invoice"
        className={Modal}
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
