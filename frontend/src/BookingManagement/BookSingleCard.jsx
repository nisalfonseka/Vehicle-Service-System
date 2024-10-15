import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { FaCarAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { BsCaretRightSquareFill } from "react-icons/bs";

import BookModel from "./BookModel";

const BookSingleCard = ({ book, onStatusUpdate }) => {
  const [showModel, setShowModel] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500';
      case 'Declined':
        return 'bg-red-500';
      case 'Completed':
        return 'bg-blue-500';
      default:
        return 'bg-yellow-300';
    }
  };

  const handleComplete = async () => {
    try {
      // Update booking status to Completed
      await fetch(`http://localhost:5555/books/${book._id.trim()}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Completed' }),
      });

      onStatusUpdate(book._id, 'Completed');
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  return (
    <div className="border border-gray-300 rounded-xl p-6 m-4 relative bg-white shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
      <Link to={`/dashboard/books/details/${book._id}`}>
        <div role="button">
          <div className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${getStatusClass(book.status)}`}>
            {book.status}
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <BiUserCircle className="text-red-400 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">{book.customerName}</h2>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <CiCalendarDate className="text-red-400 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">{book.selectedDate}</h2>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <FaCarAlt className="text-red-400 text-xl" />
            <h2 className="text-lg font-semibold text-gray-700">{book.vehicleType}</h2>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-6">
        <GiConfirmed
          className="text-2xl text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => setShowModel(true)}
        />
        <Link to={`/dashboard/books/edit/${book._id}`}>
          <MdEdit className="text-2xl text-yellow-500 hover:text-yellow-700" />
        </Link>
        <Link to={`/dashboard/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-500 hover:text-red-700" />
        </Link>
        
          <BsCaretRightSquareFill className="text-2xl text-blue-500 hover:text-blue-700"
          onClick={handleComplete}/>
        
  
        
      </div>

      {showModel && (
        <BookModel
          book={book}
          onClose={() => setShowModel(false)}
          onStatusUpdate={onStatusUpdate}
        />
      )}
    </div>
  );
};

export default BookSingleCard;
