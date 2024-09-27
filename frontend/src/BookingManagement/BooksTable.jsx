import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import Bookreport from "../BookingManagement/Bookreport";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClipLoader } from "react-spinners"; // You can use any spinner from a library like react-spinners

const BooksTable = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay to simulate the loading time

    return () => clearTimeout(timer);
  }, []);

  const checkIfDeletable = (selectedDate, selectedTimeSlot) => {
    const bookingDateTime = new Date(`${selectedDate}T${selectedTimeSlot}`);
    const currentTime = new Date();
    const timeDifference = (bookingDateTime - currentTime) / (1000 * 60 * 60); // difference in hours

    return timeDifference > 2;
  };

  // Filter books based on the search query
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
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AiOutlineSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#E53E3E" loading={loading} size={50} />
        </div>
      ) : (
        <table className="min-w-full border-collapse bg-white shadow-lg">
          <thead>
            <tr>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600">
                Booking ID
              </th>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600">
                Customer Name
              </th>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600 max-md:hidden">
                Vehicle Number
              </th>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600 max-md:hidden">
                Date
              </th>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600 max-md:hidden">
                Time
              </th>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600 max-md:hidden">
                Status
              </th>
              <th className="border-b-2 border-red-600 p-4 text-left text-sm font-semibold text-white bg-red-600">
                Operations
              </th>
              
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book._id} className="even:bg-gray-100 odd:bg-white hover:bg-gray-200">
                <td className="border-b border-gray-300 p-4 text-left">
                  {index + 1}
                </td>
                <td className="border-b border-gray-300 p-4 text-left">
                  {book.customerName}
                </td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">
                  {book.vehicleNumber}
                </td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">
                  {book.selectedDate}
                </td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">
                  {book.selectedTimeSlot}
                
                </td>
                <td className="border-b border-gray-300 p-4 text-left max-md:hidden">
                   {book.status === 'New' ? 'Pending' : book.status}
                </td>

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
                <td>
                  <div className="absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full ">
                    {book.status}
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
