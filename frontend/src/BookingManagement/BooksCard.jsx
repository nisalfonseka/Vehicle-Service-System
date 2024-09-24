import React, { useState, useEffect } from "react";
import BookSingleCard from "../BookingManagement/BookSingleCard";
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
        setFilteredBooks(response.data.data);  // Set filtered books as all books initially
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((item) => (
          <BookSingleCard
            key={item._id}
            book={item}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
