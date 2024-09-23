import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../BookingManagement/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BreakdownTable from '../components/home/BreakdownTable';
import BreakdownCard from '../components/home/BreakdownCard';

const BreakdownRequestsTable = () => {
  const [breakdownRequests, setBreakdownRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/breakdownRequests')
      .then((response) => {
        setBreakdownRequests(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Breakdown Requests List</h1>
        <Link to='/breakdownRequests/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BreakdownTable breakdownRequests={breakdownRequests} />
      ) : (
        <BreakdownCard breakdownRequests={breakdownRequests} />
      )}
    </div>
  );
};

export default BreakdownRequestsTable;
