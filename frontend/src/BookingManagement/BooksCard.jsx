import React, { useState, useEffect } from "react";
import BookSingleCard from "./BookSingleCard";
import axios from "axios";

const BooksCard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);
        setFilteredBooks(response.data.data.filter((book) => book.status === "New"));
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
      prevBooks.map((book) =>
        book._id === id ? { ...book, status: newStatus } : book
      ).filter((book) => book.status === "New") // Filter according to the selected status
    );
  };

  const handleFilterChange = (status) => {
    if (status === "All") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.status === status));
    }
  };

  return (
    <div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Modern-looking search bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            className="input input-bordered w-full pl-10 pr-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search by customer name or vehicle number"
            onChange={(e) =>
              setFilteredBooks(
                books.filter(
                  (book) =>
                    (book.customerName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      book.vehicleNumber.toLowerCase().includes(e.target.value.toLowerCase())) &&
                    (book.status === "New" || book.status === "Confirmed" || book.status === "Declined")
                )
              )
            }
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1015.5 15.5a7.5 7.5 0 001.15 10.65z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange('New')}
        >
          New
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange('Confirmed')}
        >
          Confirmed
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mx-2"
          onClick={() => handleFilterChange('Declined')}
        >
          Declined
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
