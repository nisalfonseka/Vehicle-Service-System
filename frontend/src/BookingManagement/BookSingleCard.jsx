import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { HiViewGrid } from "react-icons/hi";
import BookModel from "./BookModel";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Bookreport from "../BookingManagement/Bookreport";

const BookSingleCard = ({ book }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="border border-gray-300 rounded-xl p-6 m-4 relative bg-white shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {book.vehicleNumber}
      </div>
      <h4 className="text-sm text-gray-400">{book._id}</h4>
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

      <div className="flex justify-between items-center mt-6">
        <GiConfirmed
          className="text-2xl text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => setShowModel(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <HiViewGrid className="text-2xl text-green-500 hover:text-green-700" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <MdEdit className="text-2xl text-yellow-500 hover:text-yellow-700" />
        </Link>
        <PDFDownloadLink document={<Bookreport book={book} />} fileName="Book_Report.pdf">
          {({ loading }) =>
            loading ? (
              <button className="text-sm text-gray-500">Loading...</button>
            ) : (
              <button className="text-sm text-blue-500 hover:text-blue-700 font-semibold">Download Report</button>
            )
          }
        </PDFDownloadLink>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-500 hover:text-red-700" />
        </Link>
      </div>

      {showModel && <BookModel book={book} onClose={() => setShowModel(false)} />}
    </div>
  );
};

export default BookSingleCard;
