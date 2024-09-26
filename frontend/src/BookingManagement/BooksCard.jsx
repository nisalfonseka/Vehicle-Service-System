import React, { useState, useEffect } from "react";
import BookSingleCard from "../BookingManagement/BookSingleCard";
import axios from "axios";

const BooksCard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // State to hold selected date
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [selectedStatus, setSelectedStatus] = useState(""); // State to hold selected status

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);
        setFilteredBooks(response.data.data); // Initially display all books
      } catch (error) {
        setError("Failed to load books.");
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Function to filter books by date, name, and status
  const filterBooks = () => {
    let filtered = books;

    // Apply date filter if a date is selected
    if (selectedDate) {
      filtered = filtered.filter((book) => {
        const bookDate = new Date(book.selectedDate).toISOString().split("T")[0]; // Assuming book.selectedDate is a valid ISO date string
        return bookDate === selectedDate; // Compare book date with selected date
      });
    }

    // Apply search filter if a search term is provided
    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter if a status is selected
    if (selectedStatus) {
      filtered = filtered.filter((book) => book.status === selectedStatus);
    }

    setFilteredBooks(filtered);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    filterBooks(); // Filter books after updating the date
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterBooks(); // Filter books after updating the search term
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    filterBooks(); // Filter books after updating the status
  };

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Top bar with date picker, search input, and status dropdown */}
      <div className="flex justify-end mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange} // Filter books by date
          className="border border-gray-300 rounded p-2 mr-4" // Adds space between date and search
        />

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange} // Filter books by name
          className="border border-gray-300 rounded p-2 mr-4"
        />

        <select
          value={selectedStatus}
          onChange={handleStatusChange} // Filter books by status
          className="border border-gray-300 rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Declined">Declined</option>
        </select>
      </div>

      {/* Books grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {filteredBooks.map((item) => (
          <BookSingleCard key={item._id} book={item} />
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
