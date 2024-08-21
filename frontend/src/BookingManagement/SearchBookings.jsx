import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [book, setBook] = useState([]);
  const [filteredBook, setFilteredBook] = useState([]);

  useEffect(() => {
    // Fetch all bookings from the server when the component loads
    axios.get("http://localhost:5555/books")
      .then((response) => {
        setBook(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  useEffect(() => {
    // Filter bookings when search query changes
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = book.filter((book) => {
      return (
        book.vehicleNumber.toLowerCase().includes(lowerCaseQuery) ||
        book.customerName.toLowerCase().includes(lowerCaseQuery) ||
        book.contactNumber.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setFilteredBook(filtered);
  }, [searchQuery, book]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Search Bookings</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Vehicle Number, Customer Name, or Contact Number"
        className="border-2 border-gray-500 px-4 py-2 w-full mb-4"
      />

      <div className="bookings-list">
        {searchQuery && filteredBook.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          searchQuery && filteredBook.map((book) => (
            <div key={book._id} className="booking-item border-2 border-gray-300 p-4 mb-2">
              <p><strong>Customer Name:</strong> {book.customerName}</p>
              <p><strong>Contact Number:</strong> {book.contactNumber}</p>
              <p><strong>Vehicle Number:</strong> {book.vehicleNumber}</p>
              <p><strong>Selected Services:</strong> {book.selectedServices.join(", ")}</p>
              <p><strong>Total Cost:</strong> ${book.totalCost}</p>
              <p><strong>Selected Date:</strong> {new Date(book.selectedDate).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {book.selectedTimeSlot}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchBookings;
