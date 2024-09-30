import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../BookingManagement/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import VehiclesTable from '../VehicleManagement/VehiclesTable';
import VehiclesCard from '../VehicleManagement/VehiclesCard';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    
        <VehiclesCard vehicles={vehicles} />
     
  );
};

export default Home;
