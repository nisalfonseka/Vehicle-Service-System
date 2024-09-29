import { Link } from 'react-router-dom';
import { BiUserCircle, BiShow, BiCar, BiPhone } from 'react-icons/bi';
import { AiFillInfoCircle, AiOutlineEdit } from 'react-icons/ai';
import { Bs0Circle, Bs1Circle, BsArrowRightCircle, BsBadge3D, BsBox, BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState, useEffect } from 'react';
import BreakdownModal from './BreakdownModal';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Import jsPDF
import { AiOutlineFilePdf } from 'react-icons/ai'; // Import PDF icon

const BreakdownSingleCard = ({ breakdownRequest }) => {
  const [showModal, setShowModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  //const [assignedDrivers, setAssignedDrivers] = useState([]); // Track currently assigned drivers
  const [selectedDriver, setSelectedDriver] = useState('');
  const [status, setStatus] = useState(localStorage.getItem(`status_${breakdownRequest._id}`) || breakdownRequest.status || 'New');
  const [driverError, setDriverError] = useState(false); // Track driver assignment errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/employees');
        const allEmployees = response.data;
        const driverList = allEmployees.filter(employee => employee.position === 'driver');
        setDrivers(driverList);

        const storedDriver = localStorage.getItem(`selectedDriver_${breakdownRequest._id}`);
        const isPending = localStorage.getItem(`driverError_${breakdownRequest._id}`) === 'true';
        if (storedDriver) {
          setSelectedDriver(storedDriver);
        }

        // Check if driver is pending and set state accordingly
        if (isPending) {
          setSelectedDriver('Pending');
          setDriverError(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [breakdownRequest._id]);

  const handleAssignDriver = async (event) => {
    const driverId = event.target.value;
    const selectedDriverData = drivers.find(driver => driver._id === driverId);
    setSelectedDriver(driverId);
  
    localStorage.setItem(`selectedDriver_${breakdownRequest._id}`, driverId);
  
    try {
      const response = await axios.put(`http://localhost:5555/breakdownRequests/${breakdownRequest._id}/assign-driver`, {
        assignedDriver: selectedDriverData.employeeName,
      });
  
      alert(`Assigned ${selectedDriverData.employeeName} to ${breakdownRequest.customerName}`);
      setDriverError(false); // Reset the error state if assignment is successful
      localStorage.removeItem(`driverError_${breakdownRequest._id}`); // Clear error from localStorage
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('This driver is already assigned to another active request. Please choose another driver.');
        setSelectedDriver('Not Available'); // Set "Not Available" in the dropdown
        setDriverError(true); // Indicate that the driver is unavailable
        localStorage.setItem(`driverError_${breakdownRequest._id}`, 'true'); // Store error state in localStorage
      } else {
        console.error('Error assigning driver:', error);
      }
    }
  };  

  const handleAccept = async () => {
    const selectedDriverData = drivers.find(driver => driver._id === selectedDriver);
    const driverName = selectedDriverData ? selectedDriverData.employeeName : 'a driver';

    setStatus('Accepted');
    localStorage.setItem(`status_${breakdownRequest._id}`, 'Accepted');

    updateStatusInDatabase('Accepted');

    const message = encodeURIComponent(`Your request has been confirmed. Assigned Driver: ${driverName}`);
    const phoneNumber = encodeURIComponent(breakdownRequest.contactNumber);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDecline = async () => {
    setStatus('Declined');
    localStorage.setItem(`status_${breakdownRequest._id}`, 'Declined');

    updateStatusInDatabase('Declined');

    const message = encodeURIComponent('Your request has been declined. Try again.');
    const phoneNumber = encodeURIComponent(breakdownRequest.contactNumber);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleComplete = async () => {
    setStatus('Completed');
    localStorage.setItem(`status_${breakdownRequest._id}`, 'Completed');

    updateStatusInDatabase('Completed');

    const message = encodeURIComponent('Your request has been marked as completed.');
    const phoneNumber = encodeURIComponent(breakdownRequest.contactNumber);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const updateStatusInDatabase = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:5555/breakdownRequests/${breakdownRequest._id}/status`, {
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const generateReport = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    doc.text('Breakdown Request Report:', 10, 10);
    doc.text('------------------------', 10, 15);
    doc.text(`Customer Name: ${breakdownRequest.customerName}`, 10, 25);
    doc.text(`Vehicle Number: ${breakdownRequest.vehicleNumber}`, 10, 35);
    doc.text(`Contact Number: ${breakdownRequest.contactNumber}`, 10, 45);
    doc.text(`Request ID: ${breakdownRequest._id}`, 10, 55);
    doc.text(`Status: ${status}`, 10, 65);

    // Save the PDF
    doc.save(`BreakdownReport_${breakdownRequest._id}.pdf`);
  };

  const statusColorClasses = {
    New: 'bg-green-500 text-white',
    Accepted: 'bg-blue-500 text-white',
    Declined: 'bg-red-500 text-white',
    Completed: 'bg-yellow-300 text-white',
  };

  return (
    <div
      className="border-2 border-gray-500 rounded-lg px-6 py-4 m-4 relative hover:shadow-xl"
      style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '600px' }}
    >
      <h2
        className={`absolute top-1 right-2 px-4 py-1 rounded-lg ${statusColorClasses[status]}`}
      >
        {status}
      </h2>
      
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{breakdownRequest.customerName}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiCar className="text-red-300 text-2xl" />
        <h2 className="my-1">{breakdownRequest.vehicleNumber}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiPhone className="text-red-300 text-2xl" />
        <h2 className="my-1">{breakdownRequest.contactNumber}</h2>
      </div>

      <div className="mt-4 flex justify-between">
        <div
          onClick={handleAccept}
          className="bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
          style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          title="Accept"
        >
          <BsInfoCircle className="text-white text-xl" />
        </div>

        <div
          onClick={handleDecline}
          className="bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-700 transition duration-300 ease-in-out"
          style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          title="Decline"
        >
          <BsInfoCircle className="text-white text-xl" />
        </div>

        <div
          onClick={handleComplete}
          className="bg-yellow-300 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-700 transition duration-300 ease-in-out"
          style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          title="Complete"
        >
          <BsInfoCircle className="text-white text-xl" />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-lg font-semibold">Assign Driver:</label>
        <select
          value={selectedDriver}
          onChange={handleAssignDriver}
          className={`border rounded px-2 py-1 ${driverError ? 'bg-yellow-200' : ''}`} // Change background if error
          style={{ width: '200px', maxWidth: '100%' }} // Set a specific width for the dropdown
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.employeeName} {driverError && selectedDriver === 'Pending' ? '(Pending)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <Link to={`/breakdownRequests/details/${breakdownRequest._id}`}>
          <AiFillInfoCircle className="text-2xl text-blue-500 hover:text-black" />
        </Link>
        <Link to={`/breakdownRequests/edit/${breakdownRequest._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/breakdownRequests/delete/${breakdownRequest._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
        <AiOutlineFilePdf
          onClick={generateReport}
          className="text-2xl text-green-600 hover:text-green-800 cursor-pointer"
        />
      </div>

      {showModal && (
        <BreakdownModal breakdownRequest={breakdownRequest} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BreakdownSingleCard;
