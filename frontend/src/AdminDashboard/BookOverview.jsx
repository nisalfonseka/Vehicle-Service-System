import React, { useState, useEffect } from "react";
import axios from "axios";

const BookOverview = ({ onStatusUpdate }) => {
  const [books, setBooks] = useState([]);  // State to store books
  const [filteredBooks, setFilteredBooks] = useState([]);  // State to store filtered books

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);           // Set the books state
        setFilteredBooks(response.data.data);   // Set the filteredBooks state (initially the same as books)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books with status 'New'
  const newBooksCount = books.filter(book => book.status === "New").length;
  const confirmBooksCount = books.filter(book => book.status === "Confirmed").length;
  const declineBooksCount = books.filter(book => book.status === "Declined").length;
  const allBooksCount = books.length;

  return (
<div>
    <h1 className="text-3xl font-medium text-black text-center mt-2">
          Service Booking Overview
        </h1><br></br>
    <div className="flex flex-wrap justify-between mx-auto max-w-7xl">
        
      {/* Total Bookings Card */}
      <div
        className="border border-gray-300 rounded-xl p-6 m-2 relative bg-blue-600 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
        style={{ width: "250px", height: "150px" }}
      >
        <h2 className="text-4xl font-semibold text-white text-center">
          {allBooksCount}
        </h2>
        <h1 className="text-lg font-medium text-white text-center mt-2">
          Total Bookings
        </h1>
      </div>

      {/* New Bookings Card */}
      <div
        className="border border-gray-300 rounded-xl p-6 m-2 relative bg-blue-600 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
        style={{ width: "250px", height: "150px" }}
      >
        <h2 className="text-4xl font-semibold text-white text-center">
          {newBooksCount}
        </h2>
        <h1 className="text-lg font-medium text-white text-center mt-2">
          New Bookings
        </h1>
      </div>

      {/* Confirmed Bookings Card */}
      <div
        className="border border-gray-300 rounded-xl p-6 m-2 relative bg-green-600 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
        style={{ width: "250px", height: "150px" }}
      >
        <h2 className="text-4xl font-semibold text-white text-center">
          {confirmBooksCount}
        </h2>
        <h1 className="text-lg font-medium text-white text-center mt-2">
          Confirmed
        </h1>
      </div>

      {/* Declined Bookings Card */}
      <div
        className="border border-gray-300 rounded-xl p-6 m-2 relative bg-red-600 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
        style={{ width: "250px", height: "150px" }}
      >
        <h2 className="text-4xl font-semibold text-white text-center">
          {declineBooksCount}
        </h2>
        <h1 className="text-lg font-medium text-white text-center mt-2">
          Declined
        </h1>
      </div>
    </div>
    </div>
  );
};

export default BookOverview;
