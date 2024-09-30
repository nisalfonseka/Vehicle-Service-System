import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const BooksTable = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredBooks = books.filter((book) =>
    book.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">

        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Booking ID</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Customer Name</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Vehicle Number</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Date</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Time</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Status</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">No bookings found</td>
              </tr>
            ) : (
              filteredBooks.map((book, index) => (
                <tr key={book._id} className="even:bg-gray-100 odd:bg-white transition duration-200 hover:bg-gray-200">
                  <td className="border-b border-gray-300 p-3 text-left text-sm">{index + 1}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-sm">{book.customerName}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-sm max-md:hidden">{book.vehicleNumber}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-sm max-md:hidden">{book.selectedDate}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-sm max-md:hidden">{book.selectedTimeSlot}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-sm max-md:hidden">{book.status === 'New' ? 'Pending' : book.status}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-sm">
                    <div className="flex justify-start gap-x-2">
                      <Link to={`/books/details/${book._id}`} title="View Details">
                        <BsInfoCircle className="text-xl text-green-800 transition duration-200 hover:scale-110" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`} title="Edit Booking">
                        <AiOutlineEdit className="text-xl text-yellow-600 transition duration-200 hover:scale-110" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`} title="Delete Booking">
                        <MdOutlineDelete className="text-xl text-red-600 transition duration-200 hover:scale-110" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      
    </div>
  );
};

export default BooksTable;
