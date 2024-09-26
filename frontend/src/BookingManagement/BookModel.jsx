import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const BookModel = ({ book, onClose, onStatusUpdate }) => {
  const [declineReason, setDeclineReason] = useState("");

  const createWhatsAppLink = (message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${book.contactNumber}?text=${encodedMessage}`;
  };

  const handleConfirmBooking = async () => {
    try {
      const confirmMessage = `Your booking has been confirmed on Ashan Auto Services.\n  Vehicle: ${book.vehicleNumber}\n  Date: ${book.selectedDate}\n  Time: ${book.selectedTimeSlot}\nThank you, ${book.customerName}!`;
      const whatsappLink = createWhatsAppLink(confirmMessage);
      window.open(whatsappLink, "_blank");
  
      // Update booking status to Confirmed
      const response = await fetch(`/books/${book._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Confirmed' })
      });
  
      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
      console.log('Update Response:', data);
  
      onStatusUpdate(book._id, 'Confirmed'); // Ensure this function updates the state in the parent component
      onClose();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };
  
  
  

  const handleDeclineBooking = async () => {
    try {
      const declineMessage = `Sorry! Your booking has been declined for vehicle ${book.vehicleNumber}. Reason: ${declineReason}`;
      const whatsappLink = createWhatsAppLink(declineMessage);
      window.open(whatsappLink, "_blank");

      // Update booking status to Declined
      await fetch(`/books/${book._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Declined' })
      });

      onStatusUpdate(book._id, 'Declined');
      onClose();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <AiOutlineClose className="text-2xl cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex items-center gap-x-2 mb-4">
          <BiUserCircle className="text-2xl text-red-400" />
          <h3 className="text-lg font-semibold">{book.customerName}</h3>
        </div>
        <p><strong>Vehicle Number:</strong> {book.vehicleNumber}</p>
        <p><strong>Selected Date:</strong> {book.selectedDate}</p>
        <p><strong>Selected Time Slot:</strong> {book.selectedTimeSlot}</p>
        <p><strong>Contact Number:</strong> {book.contactNumber}</p>
        <div className="flex gap-x-4 mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleConfirmBooking}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleDeclineBooking}
          >
            Decline
          </button>
        </div>
        {book.status === "Declined" && (
          <textarea
            className="mt-4 w-full p-2 border border-gray-300 rounded"
            placeholder="Reason for declining"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default BookModel;
