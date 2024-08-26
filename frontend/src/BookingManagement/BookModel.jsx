import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import Reactwhatsapp from "react-whatsapp";

const BookModel = ({ book, onClose }) => {
  const [declineReason, setDeclineReason] = useState("");

  const createWhatsAppLink = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${book.contactNumber}?text=${encodedMessage}`;
    return whatsappLink;
  };

  const handleConfirmBooking = () => {
    const confirmMessage = `Your booking has been confirmed on Ashan Auto Services.\n  Vehicle : ${book.vehicleNumber}\n  Date : ${book.selectedDate}\n  Time : ${book.selectedTimeSlot}\nThank you, ${book.customerName}!`;
    const whatsappLink = createWhatsAppLink(confirmMessage);
    window.open(whatsappLink, "_blank");
    onClose(); // Close the modal after opening WhatsApp
  };

  const handleDeclineBooking = () => {
    const declineMessage = `Sorry! Your booking has been declined for vehicle ${book.vehicleNumber}. Reason: ${declineReason}`;
    const whatsappLink = createWhatsAppLink(declineMessage);
    window.open(whatsappLink, "_blank");
    onClose(); // Close the modal after opening WhatsApp
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-400 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl " />
          Customer Name: <h2 className="my-1">{book.customerName}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          Contact Number:<h2 className="my-1">{book.contactNumber}</h2>
        </div>
        
        <button onClick={handleConfirmBooking} className="btn btn-secondary">
          Confirm Booking
        </button>
        <br />
        <input
          type="text"
          placeholder="Enter reason for decline"
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          className="mt-2 p-2 border rounded"
        />
        <button onClick={handleDeclineBooking} className="btn btn-secondary mt-2">
          Decline Booking
        </button>
      </div>
    </div>
  );
};

export default BookModel;
