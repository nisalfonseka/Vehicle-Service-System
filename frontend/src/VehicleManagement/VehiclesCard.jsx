import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi'; 
import { BiUserCircle } from 'react-icons/bi'; 
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import VehicleReport from './VehicleReport'; // Import the new component

const VehiclesCard = ({ vehicles }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  const calculateDaysUntilNextMaintenance = (lastMaintenance, maintenanceCycle) => {
    const lastDate = new Date(lastMaintenance);
    const nextMaintenanceDate = new Date(lastDate);
    nextMaintenanceDate.setFullYear(lastDate.getFullYear() + maintenanceCycle);

    const today = new Date();
    const timeDifference = nextMaintenanceDate - today;

    const daysUntilNextMaintenance = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysUntilNextMaintenance >= 0 ? daysUntilNextMaintenance : 0; // Return 0 if overdue
  };

  const getReminderMessage = (daysUntilNextMaintenance) => {
    if (daysUntilNextMaintenance === 0) {
      return "Overdue for maintenance!";
    }
    if (daysUntilNextMaintenance <= 5) {
      return "Maintenance due soon!";
    }
    return "";
  };

  // Function to generate mailto link for Gmail
  const generateMailtoLink = (vehicle) => {
    const subject = `Maintenance Reminder for Vehicle ${vehicle.vehicleNo}`;
    const body = `Dear Driver,\n\nThe next maintenance for your vehicle (${vehicle.vehicleNo}) is due in ${calculateDaysUntilNextMaintenance(vehicle.lastMaintenance, 2)} days. Please schedule it soon!\n\nBest regards,\nVehicle Management System`;
    
    return `mailto:${vehicle.driverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Filter vehicles based on the search term
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.chassisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.fuelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.year.toString().includes(searchTerm) ||
    vehicle.lastMaintenance.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search Vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-blue-400 p-2 rounded-lg w-1/2"
        />
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4'>
        {filteredVehicles.map((item) => {
          const daysUntilNextMaintenance = calculateDaysUntilNextMaintenance(item.lastMaintenance, 2);
          const reminderMessage = getReminderMessage(daysUntilNextMaintenance);

          return (
            <div
              key={item._id}
              className='bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-4 m-4 relative shadow-md hover:shadow-xl transition-all'
            >
              <h2 className='absolute top-1 right-2 px-4 py-1 bg-blue-500 text-white rounded-full'>
                {item.year}
              </h2>
              <h4 className='my-2 text-gray-700 font-semibold'>{item._id}</h4>
              <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-blue-500 text-2xl' />
                <h2 className='my-1 font-medium'>{item.vehicleNo}</h2>
              </div>
              <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-blue-500 text-2xl' />
                <h2 className='my-1 font-medium'>{item.chassisNo}</h2>
              </div>
              <div className='flex justify-start items-center gap-x-2'>
                <h4 className='font-medium'>Vehicle Type: {item.vehicleType}</h4>
              </div>
              <div className='flex justify-start items-center gap-x-2'>
                <h4 className='font-medium'>Fuel Type: {item.fuelType}</h4>
              </div>
              <div className='flex justify-start items-center gap-x-2'>
                <h4 className='font-medium'>Year: {item.year}</h4>
              </div>
              <div className='flex justify-start items-center gap-x-2'>
                <h4 className='font-medium'>Driver's Email: {item.driverEmail}</h4>
              </div>

              {/* Display Last Maintenance and Days Until Next Maintenance */}
              <div className='mt-4'>
                <h4 className='font-medium'>Last Maintenance: {item.lastMaintenance}</h4>
                <h4 className='font-medium'>
                  Days Until Next Maintenance: {daysUntilNextMaintenance} days
                </h4>
                {reminderMessage && (
                  <h4 className='text-red-500 font-bold'>{reminderMessage}</h4>
                )}
              </div>

              <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <Link to={`/vehicles/details/${item._id}`}>
                  <BsInfoCircle className='text-2xl text-green-600 hover:text-green-400 transition duration-200' />
                </Link>
                <Link to={`/vehicles/edit/${item._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-400 transition duration-200' />
                </Link>
                <Link to={`/vehicles/delete/${item._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-400 transition duration-200' />
                </Link>
              </div>

              {/* Button to Download PDF */}
              {/* Button to Download PDF */}
              <div className="flex justify-center mt-4">
                <VehicleReport vehicle={item} /> {/* Use the new VehicleReport component */}
              </div>

              {/* Button to Send Maintenance Reminder */}
              {daysUntilNextMaintenance <= 5 && (
                <div className="flex justify-center mt-4">
                  <a
                    href={generateMailtoLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Send Maintenance Reminder
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehiclesCard;
