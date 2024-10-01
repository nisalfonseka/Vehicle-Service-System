import React, { useState } from 'react';
import BackButton from '../BookingManagement/BackButton';
import Spinner from '../BookingManagement/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteVehicle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteVehicle = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/vehicles/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle deleted successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting vehicle', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-red-200 to-orange-300 p-4'> {/* Attractive background */}
      <BackButton />
      <h1 className='text-3xl my-4 text-center text-red-600'>Delete Vehicle</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-red-400 rounded-xl w-[600px] p-8 mx-auto bg-white shadow-lg'> {/* Attractive box */}
        <h3 className='text-2xl text-center text-gray-700'>Are you sure you want to delete this vehicle?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full rounded-lg hover:bg-red-700 transition duration-200'
          onClick={handleDeleteVehicle}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteVehicle;
