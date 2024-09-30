import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import { BsInfoCircle } from 'react-icons/bs'; // Import info icon
import { AiOutlineEdit } from 'react-icons/ai'; // Import edit icon
import { MdOutlineDelete } from 'react-icons/md'; // Import delete icon

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    axios
      .get('http://localhost:5555/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  }, []);

  // Filtered vehicles based on the search term
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.chassisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.fuelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.year.toString().includes(searchTerm) ||
    vehicle.lastMaintenance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driverEmail.toLowerCase().includes(searchTerm.toLowerCase()) // Add driverEmail to search filter
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

      {/* Vehicle Table */}
      <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 border">Vehicle No</th>
            <th className="px-4 py-2 border">Chassis No</th>
            <th className="px-4 py-2 border">Vehicle Type</th>
            <th className="px-4 py-2 border">Fuel Type</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Last Maintenance</th>
            <th className="px-4 py-2 border">Driver Email</th> {/* Add Driver Email column */}
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle._id} className="hover:bg-gray-100 transition duration-200">
              <td className="border px-4 py-2">{vehicle.vehicleNo}</td>
              <td className="border px-4 py-2">{vehicle.chassisNo}</td>
              <td className="border px-4 py-2">{vehicle.vehicleType}</td>
              <td className="border px-4 py-2">{vehicle.fuelType}</td>
              <td className="border px-4 py-2">{vehicle.year}</td>
              <td className="border px-4 py-2">{vehicle.lastMaintenance}</td>
              <td className="border px-4 py-2">{vehicle.driverEmail}</td> {/* Display Driver Email */}
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/vehicles/details/${vehicle._id}`}>
                    <BsInfoCircle className="text-2xl text-green-600 hover:text-green-400 transition duration-200" />
                  </Link>
                  <Link to={`/vehicles/edit/${vehicle._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400 transition duration-200" />
                  </Link>
                  <Link to={`/vehicles/delete/${vehicle._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400 transition duration-200" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
