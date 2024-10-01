import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-4'> {/* Gradient background for the page */}
      <BackButton />
      <h1 className='text-3xl my-4 text-center text-sky-600'>Vehicle details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 bg-white shadow-lg bg-opacity-90'> {/* Background color for the box */}
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Id:</span>
            <span className='text-gray-600'>{vehicle._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Vehicle No:</span>
            <span className='text-gray-600'>{vehicle.vehicleNo}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Chassis No:</span>
            <span className='text-gray-600'>{vehicle.chassisNo}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Vehicle Type:</span>
            <span className='text-gray-600'>{vehicle.vehicleType}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Fuel Type:</span>
            <span className='text-gray-600'>{vehicle.fuelType}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Year:</span>
            <span className='text-gray-600'>{vehicle.year}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Last Maintenance:</span>
            <span className='text-gray-600'>{vehicle.lastMaintenance}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-700 font-bold'>Driver's Email:</span>
            <span className='text-gray-600'>{vehicle.driverEmail}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowVehicle;
