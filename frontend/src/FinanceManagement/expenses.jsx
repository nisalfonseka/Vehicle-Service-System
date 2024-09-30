import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDelete, MdOutlineEdit, MdSearch, MdDownload } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Spinner from '../BookingManagement/Spinner';
import CreateExpense from '../FinanceManagement/CreateExpenses'; // Ensure this path is correct
import NavBar from './Navbar';
import './expenses.css'; // Import the same CSS file used for the income table
import logo from '../FinanceManagement/AaaaAuto (1).png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Function to convert an image URL to Base64
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

const ExpenseRequestsTable = () => {
  const [expenseRequests, setExpenseRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchExpenseRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/expenseRequests');
      setExpenseRequests(response.data.data || response.data);
    } catch (error) {
      console.log('Error fetching expense requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseRequests();
  }, []);

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedRequest(null);
    fetchExpenseRequests();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/expenseRequests/${id}`);
      fetchExpenseRequests();
    } catch (error) {
      console.log('Error deleting expense request:', error);
    }
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setShowForm(true);
  };

  const handleAddExpense = () => {
    setSelectedRequest(null);
    setShowForm(true);
  };

  const filteredExpenses = expenseRequests.filter((request) => {
    return (
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to calculate the total amount of expenses
  const calculateTotalAmount = () =>
    filteredExpenses.reduce((total, req) => total + req.amount, 0);

  // Function to generate PDF report
  const generateInvoiceStatementPDF = async () => {
    const logoBase64 = await toBase64(logo); // Convert logo to Base64

    const tableBody = [
      [
        { text: 'Title', style: 'tableHeader' },
        { text: 'Date', style: 'tableHeader' },
        { text: 'Description', style: 'tableHeader' },
        { text: 'Payment Method', style: 'tableHeader' },
        { text: 'Amount', style: 'tableHeader' },
      ],
      ...filteredExpenses.map((request) => [
        { text: request.title, style: 'tableData' },
        { text: new Date(request.date).toLocaleDateString(), style: 'tableData' },
        { text: request.description, style: 'tableData' },
        { text: request.paymentMethod, style: 'tableData' },
        { text: `Rs.${request.amount.toFixed(2)}`, style: 'tableData' },
      ]),
    ];

    // Add total amount row
    tableBody.push([
      { text: 'Total Amount', colSpan: 4, alignment: 'right', style: 'tableTotal' }, {}, {}, {},
      { text: `Rs.${calculateTotalAmount().toFixed(2)}`, style: 'tableTotal' },
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
          text: 'Expense Statement',
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
          alignment: 'center',
          margin: [0, 20, 0, 10], // Updated margin with top = 20
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          fillColor: '#131769',
          color: 'white',
          alignment: 'center',
          margin: [0, 5, 0, 5],
        },
        tableData: {
          fontSize: 10,
          alignment: 'center',
          margin: [0, 5, 0, 5],
        },
        tableTotal: {
          bold: true,
          fontSize: 12,
          alignment: 'right',
          fillColor: '#8c1111',
          margin: [0, 5, 0, 5],
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };
    

    pdfMake.createPdf(docDefinition).download('Expense_Statement.pdf');
  };

  return (
    <div className="container">
      <NavBar />
      <div className="expense-list-container">
        <h1 className="text-4xl my-8">Ashan Auto Service</h1>
        <h3 className="text-2xl my-8">Expenses List</h3>

        {/* Search bar */}
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search Expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MdSearch className="search-icon" />
        </div>

        {/* Modal for CreateExpense */}
        {showForm && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <CreateExpense
                onClose={handleFormClose}
                refreshData={fetchExpenseRequests}
                initialData={selectedRequest}
              />
            </div>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((request) => (
                  <tr key={request._id}>
                    <td>{request.title}</td>
                    <td>{new Date(request.date).toLocaleDateString()}</td>
                    <td>{request.description}</td>
                    <td>{request.paymentMethod}</td>
                    <td>Rs.{request.amount.toFixed(2)}</td>
                    <td className="actions">
                      <button onClick={() => handleEdit(request)}>
                        <MdOutlineEdit className="icon" />
                      </button>
                      <button onClick={() => handleDelete(request._id)}>
                        <MdOutlineDelete className="icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No expense requests available.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-right font-bold">
                  Total Amount:
                </td>
                <td className="font-bold">
                  Rs.{calculateTotalAmount().toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}

        <button onClick={handleAddExpense} className="add-expense-btn">
          Add Expenses
        </button>

        <button onClick={generateInvoiceStatementPDF} className="generate-report-btn">
          <MdDownload className="icon" /> Download Expenses Report
        </button>
      </div>
    </div>
  );
};

export default ExpenseRequestsTable;
