import React, { useState, useEffect } from 'react';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditVehicle = () => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [chassisNo, setChassisNo] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [year, setYear] = useState('');
  const [driverEmail, setDriverEmail] = useState(''); // New field for driver's email
  const [lastMaintenance, setLastMaintenance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/vehicles/${id}`)
      .then((response) => {
        setVehicleNo(response.data.vehicleNo);
        setChassisNo(response.data.chassisNo);
        setVehicleType(response.data.vehicleType);
        setFuelType(response.data.fuelType);
        setYear(response.data.year);
        setDriverEmail(response.data.driverEmail); // Set the driver's email
        setLastMaintenance(response.data.lastMaintenance);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching vehicle data', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const validateInputs = () => {
    if (!vehicleNo || !chassisNo || !vehicleType || !fuelType || !year || !driverEmail || !lastMaintenance) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return false;
    }

    if (!validateEmail(driverEmail)) {
      enqueueSnackbar('Invalid email format for Driver\'s Email', { variant: 'error' });
      return false;
    }

    return true;
  };

  const handleEditVehicle = () => {
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
      .put(`http://localhost:5555/vehicles/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle edited successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing vehicle', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-green-200 to-blue-300 p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center text-sky-600'>Edit Vehicle</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white shadow-lg'>
        {[ // Mapping all form fields dynamically, including new fields
          { label: 'Vehicle No', value: vehicleNo, setter: setVehicleNo },
          { label: 'Chassis No', value: chassisNo, setter: setChassisNo },
          {
            label: 'Vehicle Type',
            value: vehicleType,
            setter: setVehicleType,
            type: 'select',
            options: ['CAR', 'LORRY', 'BIKE', 'VAN', 'TRUCK'],
          },
          {
            label: 'Fuel Type',
            value: fuelType,
            setter: setFuelType,
            type: 'select',
            options: ['PETROL', 'DIESEL'],
          },
          { label: 'Year', value: year, setter: setYear, type: 'number' },
          { label: 'Driver\'s Email', value: driverEmail, setter: setDriverEmail, type: 'email' }, // New field
          { label: 'Last Maintenance', value: lastMaintenance, setter: setLastMaintenance, type: 'date' },
        ].map(({ label, value, setter, type = 'text', options }) => (
          <div className='my-4' key={label}>
            <label className='text-xl mr-4 text-gray-700'>{label}</label>
            {type === 'select' ? (
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                <option value=''>Select {label}</option>
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
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400'
                placeholder={`Enter ${label}`}
              />
            )}
          </div>
        ))}
        <button
          className='p-2 bg-sky-500 text-white rounded-lg m-8 hover:bg-sky-600 transition duration-200'
          onClick={handleEditVehicle}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditVehicle;
