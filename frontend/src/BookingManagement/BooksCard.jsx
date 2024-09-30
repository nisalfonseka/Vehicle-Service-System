import React, { useState, useEffect } from "react";
import BookSingleCard from "../BookingManagement/BookSingleCard";
import axios from "axios";

const BooksCard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);
        // Display only "New" books by default
        setFilteredBooks(response.data.data.filter(book => book.status === "New"));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === id ? { ...book, status: newStatus } : book
      )
    );
    setFilteredBooks((prevBooks) =>
      prevBooks
        .map((book) =>
          book._id === id ? { ...book, status: newStatus } : book
        )
        .filter((book) => book.status === "New") // Filter according to the selected status
    );
  };

  const handleFilterChange = (status) => {
    if (status === "All") {
      setFilteredBooks(books); // Show all books
    } else {
      setFilteredBooks(books.filter((book) => book.status === status));
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterBooks(value, selectedDate);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    filterBooks(searchTerm, date);
  };

  const filterBooks = (name, date) => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.customerName.toLowerCase().includes(name) &&
          (!date || book.selectedDate === date)
      )
    );
  };

  return (
    <div className="bg-white-600">
      {/* Search and Date Filters */}
      <div className="flex justify-between mb-8">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 rounded-lg w-1/3"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border px-4 py-2 rounded-lg"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          className="bg-yellow-300 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange("New")}
        >
          New
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange("Confirmed")}
        >
          Confirmed
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange("Declined")}
        >
          Declined
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredBooks.map((item) => (
          <BookSingleCard
            key={item._id}
            book={item}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
