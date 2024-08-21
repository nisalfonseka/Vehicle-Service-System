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
    const timeDifference = (bookingDateTime - currentTime) / (1000 * 60 * 60 ); // difference in hours

    return timeDifference > 2;
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by customer name or vehicle number"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">Booking ID</th>
            <th className="border border-slate-600 rounded-md">Customer Name</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Vehicle Number
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Date
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Time
            </th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center ">
                {book.customerName}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.vehicleNumber}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.selectedDate}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.selectedTimeSlot}
              </td>
              
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className=" text-2xl text-green-800" />
                  </Link>
                  
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className=" text-2xl text-yellow-600" />
                  </Link>
                  <PDFDownloadLink document={<Bookreport book={book} />} fileName="FORM">
                        {({ loading }) =>
                          loading ? <button>loading...</button> : <button className='font-bold text-black'>Report</button>
                        }
                  </PDFDownloadLink>
                  
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className=" text-2xl text-red-600" />
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
