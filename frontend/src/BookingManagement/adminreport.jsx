import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Bookreport from "../BookingManagement/Bookreport";
import Allbookreport from "./Allbokreport";
import { ClipLoader } from "react-spinners";

const Adminreport = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle date filter change
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); // Update selected status based on dropdown selection
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter bookings based on search query, date, and status
  const filteredBooks = books.filter((book) => {
    const isNameOrVehicleMatched =
      book.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const isDateMatched = selectedDate ? book.selectedDate === selectedDate : true;
    const isStatusMatched = selectedStatus === "All" || book.status === selectedStatus;

    return isNameOrVehicleMatched && isDateMatched && isStatusMatched;
  });

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-8">
        {/* Date filter */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border px-4 py-2 rounded-lg"
        />

        {/* Status filter */}
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Declined">Declined</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      {/* Button to generate report for all filtered bookings */}
      <div className="mb-4">
        <PDFDownloadLink
          document={<Allbookreport books={filteredBooks} />}
          fileName={`bookings_report_${selectedDate || 'all'}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button className="text-sm text-gray-500">Loading report...</button>
            ) : (
              <button className="px-4 py-2 text-base font-semibold text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:bg-red-700">
                Download Report for Filtered Data
              </button>
            )
          }
        </PDFDownloadLink>
      </div>

      {/* Bookings Table */}
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#f87171"} loading={loading} />
        </div>
      ) : (
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Booking ID</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Customer Name</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Vehicle Number</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Date</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Time</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Services</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l max-md:hidden">Status</th>
              <th className="border-b-2 border-red-600 p-3 text-left text-l">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">No bookings found</td>
              </tr>
            ) : (
              filteredBooks.map((book, index) => (
                <tr key={book._id} className="even:bg-gray-100 odd:bg-white transition duration-200 hover:bg-gray-200">
                  <td className="border-b border-gray-300 p-3 text-left text-l">{index + 1}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-l">{book.customerName}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-l max-md:hidden">{book.vehicleNumber}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-l max-md:hidden">{book.selectedDate}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-l max-md:hidden">{book.selectedTimeSlot}</td>
                  <td className="border-b border-gray-300 p-3 text-left text-l max-md:hidden">
                    {Array.isArray(book.selectedServices) ? book.selectedServices.join(', ') : ''}
                  </td>
                  <td className="border-b border-gray-300 p-3 text-left text-l max-md:hidden">
                    {book.status === 'New' ? 'Pending' : book.status}
                  </td>
                  <td className="border-b border-gray-300 p-3 text-left text-l">
                    <div className="flex justify-start gap-x-2">
                      <PDFDownloadLink
                        document={<Bookreport books={[book]} />}
                        fileName={`${book.vehicleNumber}.pdf`}
                      >
                        {({ loading }) =>
                          loading ? (
                            <button className="text-sm text-gray-500">Loading...</button>
                          ) : (
                            <button className="px-2 py-3 text-base font-semibold text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:bg-red-700">
                              Report
                            </button>
                          )
                        }
                      </PDFDownloadLink>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Adminreport;