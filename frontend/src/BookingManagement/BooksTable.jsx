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
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by customer name or vehicle number"
            className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#E53E3E" loading={loading} size={50} />
        </div>
      ) : (
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="border-b-2 border-red-600 p-4 text-left">Booking ID</th>
              <th className="border-b-2 border-red-600 p-4 text-left">Customer Name</th>
              <th className="border-b-2 border-red-600 p-4 text-left max-md:hidden">Vehicle Number</th>
              <th className="border-b-2 border-red-600 p-4 text-left max-md:hidden">Date</th>
              <th className="border-b-2 border-red-600 p-4 text-left max-md:hidden">Time</th>
              <th className="border-b-2 border-red-600 p-4 text-left max-md:hidden">Status</th>
              <th className="border-b-2 border-red-600 p-4 text-left">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book._id} className="even:bg-gray-100 odd:bg-white hover:bg-gray-200">
                <td className="border-b border-gray-300 p-4 text-left">{index + 1}</td>
                <td className="border-b border-gray-300 p-4 text-left">{book.customerName}</td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">{book.vehicleNumber}</td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">{book.selectedDate}</td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">{book.selectedTimeSlot}</td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">{book.status === 'New' ? 'Pending' : book.status}</td>
                <td className="border-b border-gray-300 p-4 text-left">
                  <div className="flex justify-start gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksTable;
