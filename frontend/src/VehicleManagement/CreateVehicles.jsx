import React, { useEffect, useState } from 'react';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateVehicle = () => {
  const [empmanageRequests, setEmpmanageRequests] = useState([]); // Corrected state name
  const [vehicleNo, setVehicleNo] = useState('');
  const [chassisNo, setChassisNo] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [year, setYear] = useState('');
  const [driverEmail, setDriverEmail] = useState(''); // Driver email
  const [lastMaintenance, setLastMaintenance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.get("http://localhost:5555/empmanageRequests");
        setEmpmanageRequests(result.data.data); // Set employee data correctly
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateVehicleChassisNo = (input) => {
    const vehicleChassisNoRegex = /^[A-Z]{2,3}-\d{4}$/;
    return vehicleChassisNoRegex.test(input);
  };

  const validateInputs = () => {
    if (!vehicleNo || !chassisNo || !vehicleType || !fuelType || !year || !driverEmail || !lastMaintenance) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return false;
    }

    if (!validateVehicleChassisNo(vehicleNo)) {
      enqueueSnackbar('Vehicle No should be in the format of 2 or 3 uppercase letters followed by a dash and 4 digits (e.g., ABC-1234)', { variant: 'error' });
      return false;
    }

    if (!validateVehicleChassisNo(chassisNo)) {
      enqueueSnackbar('Chassis No should be in the format of 2 or 3 uppercase letters followed by a dash and 4 digits (e.g., ABC-1234)', { variant: 'error' });
      return false;
    }

    if (!validateEmail(driverEmail)) {
      enqueueSnackbar('Invalid email format for Driver\'s Email', { variant: 'error' });
      return false;
    }

    return true;
  };

  const handleSaveVehicle = () => {
    if (!validateInputs()) {
      return;
    }

    const data = {
      vehicleNo,
      chassisNo,
      vehicleType,
      fuelType,
      year,
      driverEmail,
      lastMaintenance,
    };

    setLoading(true);
    axios
      .post('http://localhost:5555/vehicles', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle created successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          enqueueSnackbar(`Error: ${error.response.data.message}`, { variant: 'error' });
        } else {
          enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
        }
        console.log(error);
      });
  };

  return (
    <div className="p-4 bg-white-600 min-h-screen">
      <h1 className="text-4xl text-black font-bold my-4 text-center">Create Vehicle</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl shadow-lg w-[600px] p-6 mx-auto bg-white">
        {[
          { label: 'Vehicle No', value: vehicleNo, setter: setVehicleNo },
          { label: 'Chassis No', value: chassisNo, setter: setChassisNo },
          {
            label: 'Vehicle Type',
            value: vehicleType,
            setter: setVehicleType,
            type: 'select',
            options: ['CAR', 'LORRY', 'BIKE', 'VAN', 'TRUCK'],
          },
          { label: 'Fuel Type', value: fuelType, setter: setFuelType, type: 'select', options: ['PETROL', 'DIESEL'] },
          { label: 'Year', value: year, setter: setYear, type: 'number' },
          {
            label: 'Driver Email',
            value: driverEmail,
            setter: setDriverEmail,
            type: 'select', // Use a select input for driver emails
            options: empmanageRequests.map((employee) => employee.email), // Fetch and display emails
          },
          { label: 'Last Maintenance', value: lastMaintenance, setter: setLastMaintenance, type: 'date' },
        ].map(({ label, value, setter, type = 'text', options }) => (
          <div className="my-4" key={label}>
            <label className="text-xl mr-4 text-gray-700">{label}</label>
            {type === 'select' ? (
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="border-2 border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder={`Enter ${label}`}
              />
            )}
          </div>
        ))}
        <button
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 m-8"
          onClick={handleSaveVehicle}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default CreateVehicle;
