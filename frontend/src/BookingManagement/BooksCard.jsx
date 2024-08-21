import { useState } from "react";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  // Step 1: Add a state to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Step 2: Filter books based on the search query
  const filteredBooks = books.filter(
    (book) =>
      book.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Step 3: Add an input field for the search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Search by customer name or vehicle number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBooks.map((item) => (
          <BookSingleCard key={item._id} book={item} />
        ))}
      </div>
    </div>
  );
};

export default BooksCard;
