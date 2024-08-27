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
    <div className="p-4 flex flex-col items-center">
      
      <h1 className="text-3xl my-4 text-black-600 font-bold">Your Booking Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-red-500 rounded-xl w-fit p-6 bg-white shadow-lg">
          {[
            { label: "Id", value: book._id },
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
            <div
              key={index}
              className="my-2 flex justify-between border-b border-red-300 pb-2"
            >
              <span className="text-xl font-bold text-black-600">{item.label}</span>
              <span className="text-xl text-gray-700">{item.value}</span>
            </div>
          ))}

          <div className="flex justify-center mt-4">
          <PDFDownloadLink 
           document={<Bookreport book={book} />} 
           fileName={`${book.vehicleNumber}.pdf`}>
            {({ loading }) =>
                loading ? (
            <button className="text-sm text-gray-500">Loading...</button>
             ) : (
                  <button className="items-center allign-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white bg-red-600 border border-transparent rounded-md lg:inline-flex hover:bg-red-700 focus:bg-red-700">
                Download Report
                    </button>
                )
           }
        </PDFDownloadLink></div>
        </div>
      )}
    </div>
  </div>
  );
}

export default ShowBook;
