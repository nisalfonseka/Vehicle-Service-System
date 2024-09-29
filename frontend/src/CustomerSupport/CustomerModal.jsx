import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiCar, BiPhone, BiUserCircle, BiVoicemail } from 'react-icons/bi';
import { useState, useEffect } from 'react';

const CustomerModal = ({ customer, onClose }) => {
  const [authorEmail, setAuthorEmail] = useState(customer.email);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setAuthorEmail(customer.email);
  }, [customer.email]);

  const handleSuccess = () => {
    if (!isValidEmail(authorEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      const message = "Thank you for reaching out to us. We have received your ticket and we will keep you updated on the progress and notify you as soon as the issue is resolved..";
      window.open(`mailto:${authorEmail}?subject=Ticket Received – Your Issue is Being Addressed&body=${message}`);
      onClose("Success"); // Pass 'Success' status to parent
    }
  };

  const handleUnsuccess = () => {
    if (!isValidEmail(authorEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      const message = "We’ve reviewed your ticket (Ticket ID: [Ticket Number]), but the details provided are unclear. To help us resolve your issue efficiently, could you please resend the ticket with more specific information?";
      window.open(`mailto:${authorEmail}?subject=Ticket Unsuccess – Further Details Required&body=${message}`);
      onClose("Unsuccess"); // Pass 'Unsuccess' status to parent
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={() => onClose()}
        />
        <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
          {customer.customerName}
        </h2>
        <h4 className='my-2 text-gray-500'>{customer.customer_id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-2'>{customer.email}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiPhone className='text-red-300 text-2xl' />
          <h2 className='my-2'>{customer.mobileNumber}</h2>
         
          
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiCar className='text-red-300 text-2xl' />
          <h2 className='my-2'>{customer.vehicleNumber}</h2>
        </div>

        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-2'>{customer.subject}</h2>
        </div>

        
        <div className="flex flex-col gap-y-2 mt-4">
          {emailError && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}
         
          <button
            onClick={handleSuccess}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Success
          </button>
          <button
            onClick={handleUnsuccess}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Unsuccess
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
