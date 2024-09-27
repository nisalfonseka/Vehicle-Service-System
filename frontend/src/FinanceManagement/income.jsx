import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import NavBar from './Navbar';
import './Income.css';
import { MdSearch } from 'react-icons/md'; // Import the MdSearch icon
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from '../FinanceManagement/AaaaAuto (1).png'; // Adjust the path as needed
 // Import your invoice form

// Set pdfmake fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Utility function to convert image to Base64
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

const IncomeRequestsTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [logoBase64, setLogoBase64] = useState('');

  // Fetch invoices from the backend
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/invoiceRequests');
      const invoiceData = response.data.data || response.data;
      const updatedInvoices = invoiceData.map((invoice) => ({
        ...invoice,
        finalAmount: (invoice.amount || 0) + (invoice.taxAmount || 0) - (invoice.discountAmount || 0),
      }));
      setInvoices(updatedInvoices);
      setFilteredInvoices(updatedInvoices); // Update filtered invoices as well
    } catch (error) {
      console.log('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    const filtered = invoices.filter((invoice) =>
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInvoices(filtered);
  }, [searchQuery, invoices]);

  useEffect(() => {
    toBase64(logo).then(setLogoBase64);
  }, []);

  const calculateTotalAmount = () => {
    return filteredInvoices.reduce((total, invoice) => total + invoice.finalAmount, 0);
  };

  const generateInvoiceStatementPDF = () => {
    const tableBody = [
      [{ text: 'Service Type', style: 'tableHeader' }, { text: 'Customer Name', style: 'tableHeader' }, { text: 'Date', style: 'tableHeader' }, { text: 'Payment Method', style: 'tableHeader' }, { text: 'Final Amount', style: 'tableHeader' }],
      ...filteredInvoices.map(invoice => [
        { text: invoice.serviceType || 'N/A', style: 'tableData' },
        { text: invoice.customerName || 'N/A', style: 'tableData' },
        { text: new Date(invoice.invoiceDate).toLocaleDateString() || 'N/A', style: 'tableData' },
        { text: invoice.paymentMethod || 'N/A', style: 'tableData' },
        { text: `Rs.${invoice.finalAmount.toFixed(2)}` || 'N/A', style: 'tableData' },
      ])
    ];

    // Add the total row at the bottom of the table
    tableBody.push([
      { text: 'Total Amount', colSpan: 4, alignment: 'right', style: 'tableTotal' }, {}, {}, {},
      { text: `Rs.${calculateTotalAmount().toFixed(2)}`, style: 'tableTotal' }
    ]);

    const docDefinition = {
      content: [
        {
          image: logoBase64,
          width: 150,
          height: 100,
          alignment: 'center',
        },
        {
          text: 'Ashan Auto Service',
          style: 'header',
          margin: [0, 20, 0, 10], // Added margin-top of 20
          fontSize: 30, // Set font size
          bold: true, // Set font to bold (you can use italics or normal as well)
          color: '#851f14', // Set text color
        },
        
        {
          text: 'Income Statement',
          style: 'header',
          margin: [0, 20, 0, 10], // Added margin-top of 20
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center'
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'white',
          fillColor: '#131769',
          alignment: 'center',
          margin: [0, 5, 0, 5]
        },
        tableData: {
          fontSize: 10,
          alignment: 'center',
          margin: [0, 5, 0, 5]
        },
        tableTotal: {
          bold: true,
          fontSize: 12,
          alignment: 'right',
          margin: [0, 5, 0, 5],
          fillColor: '#8c1111',
        }
      },
      defaultStyle: {
        fontSize: 10,
      }
    };

    try {
      pdfMake.createPdf(docDefinition).download('Income_Statement.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedInvoice(null);
    fetchInvoices();
  };

  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setShowForm(true);
  };

  return (
    <div className="container">
      <NavBar />
      <div className='income-list-container'>
        <h1 className='text-4xl my-0'>Ashan Auto Service</h1>
        <h3 className='text-2xl my-0'>Income List</h3>

        {/* Search bar with icon */}
        <div className='search-bar-container'>
          <input
            type='text'
            placeholder='Search Invoices...'
            className='search-bar'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MdSearch className="search-icon" /> {/* Added search icon */}
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredInvoices.length === 0 ? (
              <p>No invoices found.</p>
            ) : (
              <table className='income-table'>
                <thead>
                  <tr>
                    <th>Service Type</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Final Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td>{invoice.serviceType}</td>
                      <td>{invoice.customerName}</td>
                      <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                      <td>{invoice.paymentMethod}</td>
                      <td>Rs.{invoice.finalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan='4' className='text-right font-bold'>
                      Total Amount:
                    </td>
                    <td className='font-bold'>Rs.{calculateTotalAmount().toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            )}
            \n
            <button
            
              onClick={generateInvoiceStatementPDF}
              className='add-income-btn'
            >
              Download Income Statement
            </button>
          </>
        )}

        {showForm && (
          <div className='modal-backdrop' onClick={handleFormClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
              <button onClick={handleFormClose} className='close-button'>
                &times;
              </button>

              <CreateInvoice
                onClose={handleFormClose}
                refreshData={fetchInvoices}
                initialData={selectedInvoice}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeRequestsTable;
