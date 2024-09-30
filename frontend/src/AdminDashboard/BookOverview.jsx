import React, { useState, useEffect } from "react";
import axios from "axios";

const BookOverview = ({ onStatusUpdate }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Count the number of bookings received today (based on creation date)
  const todayBookingsCount = books.filter(book => 
    new Date(book.createdAt).toISOString().split("T")[0] === today
  ).length;

  // Count the number of bookings with selected date as today
  const todaySelectedBookingsCount = books.filter(book => 
    new Date(book.selectedDate).toISOString().split("T")[0] === today
  ).length;

  // Count of today's confirmed bookings
  const todayConfirmedBookingsCount = books.filter(book => 
    new Date(book.createdAt).toISOString().split("T")[0] === today && book.status === "Confirmed"
  ).length;

  // Count of today's declined bookings
  const todayDeclinedBookingsCount = books.filter(book => 
    new Date(book.createdAt).toISOString().split("T")[0] === today && book.status === "Declined"
  ).length;

  // Other filters
  const newBooksCount = books.filter(book => book.status === "New").length;
  const confirmBooksCount = books.filter(book => book.status === "Confirmed").length;
  const declineBooksCount = books.filter(book => book.status === "Declined").length;
  const allBooksCount = books.length;

  return (
    <div>
      <h1 className="text-3xl font-medium text-black text-center mt-2">
        Today Booking Overview
      </h1>
      <br />
      <div className="flex flex-wrap justify-center mx-auto max-w-7xl">

        {/* New Bookings Card */}
        <style>
        {`
          @keyframes alert {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          .alert-effect {
            animation: alert 0.8s infinite;
          }
        `}
      </style>
      <div
  className={`border border-red-500 rounded-xl p-6 m-2 relative bg-red-500 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center ${
    newBooksCount > 0 ? "alert-effect" : ""
  }`}
  style={{ width: "350px", height: "180px" }}
>
  <h2 className="text-6xl font-semibold text-white text-center">
    {newBooksCount}
  </h2>
  <h1 className="text-lg font-medium text-white text-center mt-2">
    Pending / New Bookings
  </h1>
</div>


        {/* Bookings for Today's Date Card */}
        <div
          className="border border-gray-300 rounded-xl p-6 m-2 relative bg-yellow-400 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {todaySelectedBookingsCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            Upcoming Services for Today's Date
          </h1>
        </div>

        {/* Bookings Received Today Card */}
        <div
          className="border border-gray-300 rounded-xl p-6 m-2 relative bg-purple-600 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {todayBookingsCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            Bookings Received Today
          </h1>
        </div>

        {/* Confirmed Bookings Today Card */}
        <div
          className="border border-gray-300 rounded-xl p-6 m-2 relative bg-green-500 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {todayConfirmedBookingsCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            Confirmed Bookings Today
          </h1>
        </div>

        {/* Declined Bookings Today Card */}
        <div
          className="border border-gray-300 rounded-xl p-6 m-2 relative bg-red-400 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center"
          style={{ width: "350px", height: "180px" }}
        >
          <h2 className="text-6xl font-semibold text-white text-center">
            {todayDeclinedBookingsCount}
          </h2>
          <h1 className="text-lg font-medium text-white text-center mt-2">
            Declined Bookings Today
          </h1>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h1 className="text-3xl font-medium text-black text-center mt-2">
          Alltime Booking Overview
        </h1>
        <br />
        <div className="flex flex-wrap justify-center mx-auto max-w-7xl">
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
    </div>
  );
};

export default BookOverview;
