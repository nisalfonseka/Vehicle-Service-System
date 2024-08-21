import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

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
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Your Booking Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Customer Name</span>
            <span>{book.customerName}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Vehicle Type</span>
            <span>{book.vehicleType}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Vehicle Number</span>
            <span>{book.vehicleNumber}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Selected Services</span>
            <span>{book.selectedServices}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Estimated Cost</span>
            <span>{book.totalCost}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Estimated Time</span>
            <span>{book.totalTime}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date</span>
            <span>{book.selectedDate}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Time</span>
            <span>{book.selectedTimeSlot}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowBook;
