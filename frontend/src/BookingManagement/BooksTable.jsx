import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import Bookreport from "../BookingManagement/Bookreport";
import { PDFDownloadLink } from "@react-pdf/renderer";

const BooksTable = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");

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
      <input
        type="text"
        placeholder="Search by customer name or vehicle number"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

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
              <td className="border-b border-gray-300 p-4 text-left">
                <div className="flex justify-start gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>

                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <PDFDownloadLink document={<Bookreport book={book} />} fileName="FORM">
                    {({ loading }) =>
                      loading ? (
                        <button>loading...</button>
                      ) : (
                        <button className="font-bold text-black">Report</button>
                      )
                    }
                  </PDFDownloadLink>

                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
