import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../BookingManagement/BackButton";
import Spinner from "../BookingManagement/Spinner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Bookreport from "../BookingManagement/Bookreport";

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <BackButton />
      <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
        <h1 className="text-4xl my-4 text-gray-800 font-bold">Booking Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full max-w-4xl">
            <div className="overflow-x-auto  rounded-lg">
              <table className="min-w-full bg-white rounded-lg border border-gray-300">
                <thead>
                  <tr className="bg-red-600 text-white text-left">
                    <th className="py-3 px-4 text-lg font-semibold">Field</th>
                    <th className="py-3 px-4 text-lg font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {[
                    { label: "Customer Name", value: book.customerName },
                    { label: "Vehicle Type", value: book.vehicleType },
                    { label: "Vehicle Number", value: book.vehicleNumber },
                    { label: "Selected Services", value: Array.isArray(book.selectedServices) ? book.selectedServices.join(', ') : '' },
                    { label: "Estimated Cost", value: book.totalCost },
                    { label: "Estimated Time", value: book.totalTime },
                    { label: "Date", value: book.selectedDate },
                    { label: "Time", value: book.selectedTimeSlot },
                    { label: "Create Time", value: new Date(book.createdAt).toString() },
                    { label: "Update Time", value: new Date(book.updatedAt).toString() },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 font-medium text-gray-700">{item.label}</td>
                      <td className="py-3 px-4 text-gray-600">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6">
              <PDFDownloadLink 
                document={<Bookreport book={book} />} 
                fileName={`${book.vehicleNumber}.pdf`}>
                {({ loading }) =>
                  loading ? (
                    <button className="text-sm text-gray-500">Loading...</button>
                  ) : (
                    <button className="px-6 py-3 text-base font-semibold text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:bg-red-700">
                      Download Report
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowBook;
