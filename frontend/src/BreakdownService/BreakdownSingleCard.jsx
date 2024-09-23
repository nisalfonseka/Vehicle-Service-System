import { Link } from 'react-router-dom';
import { BiUserCircle, BiShow, BiCar, BiPhone } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState, useEffect } from 'react';
import BreakdownModal from './BreakdownModal';
import axios from 'axios'; // For making API calls

const BreakdownSingleCard = ({ breakdownRequest }) => {
  const [showModal, setShowModal] = useState(false);
  const [drivers, setDrivers] = useState([]); // Store the list of drivers
  const [selectedDriver, setSelectedDriver] = useState('');

  // Fetch drivers when the component mounts
  //useEffect(() => {
    //const fetchDrivers = async () => {
      //try {
        //const response = await axios.get('/drivers'); // API endpoint for fetching employees
        //const allEmployees = response.data;

        // Filter only the employees who are drivers
        //const driverList = allEmployees.filter(employee => employee.position === 'driver');
        //setDrivers(driverList);
      //} catch (error) {
       // console.error('Error fetching employees:', error);
     // }
    //};

   // fetchDrivers();
  //}, []);

  //const handleAssignDriver = (event) => {
    //const driverId = event.target.value;
    //const selectedDriver = drivers.find(driver => driver._id === driverId);
  //  setSelectedDriver(driverId);

    // Logic to assign the selected driver to the breakdown request (e.g., API call)
   // alert(`Assigned ${selectedDriver.name} to ${breakdownRequest.customerName}`);

    // Optionally: API call to update the database with the assigned driver
    /*
    axios.put(`/api/breakdownRequests/${breakdownRequest._id}/assignDriver`, {
      driverId,
    }).then(() => {
      alert('Driver assigned successfully!');
    }).catch(error => {
      console.error('Error assigning driver:', error);
    });
    */
  //};

  const generateReport = () => {
    const reportContent = `
      Breakdown Request Report:
      ------------------------
      Customer Name: ${breakdownRequest.customerName}
      Vehicle Number: ${breakdownRequest.vehicleNumber}
      Contact Number: ${breakdownRequest.contactNumber}
      Request ID: ${breakdownRequest._id}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BreakdownReport_${breakdownRequest._id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Static list of drivers
  useEffect(() => {
    const staticDrivers = [
      { _id: '1', name: 'John Doe' },
      { _id: '2', name: 'Jane Smith' },
      { _id: '3', name: 'Mike Johnson' },
    ];
    setDrivers(staticDrivers);
  }, []);

  return (
    <div
      className="border-2 border-gray-500 rounded-lg px-6 py-4 m-4 relative hover:shadow-xl"
      style={{ backgroundColor: '#ffefd5', width: '100%', maxWidth: '600px' }}
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {breakdownRequest.customerName}
      </h2>
      <h4 className="my-2 text-gray-500">{breakdownRequest._id}</h4>
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

      {/* Driver Assignment Dropdown */}
      <div className="mt-4">
        <label className="text-lg font-semibold">Assign Driver:</label>
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/breakdownRequests/details/${breakdownRequest._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/breakdownRequests/edit/${breakdownRequest._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/breakdownRequests/delete/${breakdownRequest._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
        <button
          onClick={generateReport}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Report
        </button>
      </div>

      {showModal && (
        <BreakdownModal breakdownRequest={breakdownRequest} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BreakdownSingleCard;
