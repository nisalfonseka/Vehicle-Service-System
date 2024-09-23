import { useEffect, useState } from 'react';
import axios from 'axios';
import BreakdownSingleCard from './BreakdownSingleCard';

const BreakdownCard = () => {
  const [breakdownRequests, setBreakdownRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/breakdownRequests')
      .then((response) => {
        setBreakdownRequests(response.data.data);
        setFilteredRequests(response.data.data); // Set initial filtered requests
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to fetch breakdown requests');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredRequests(breakdownRequests);
  }, [breakdownRequests]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query === '') {
      setFilteredRequests(breakdownRequests);
    } else {
      const filtered = breakdownRequests.filter(
        (request) =>
          request.customerName.toLowerCase().includes(query.toLowerCase()) ||
          request._id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRequests(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredRequests.length === 0) {
    return <div>No breakdown requests found.</div>;
  }

  return (
    <div>
      <div className="text-5xl font-bold text-center mb-4">Breakdown Service Dashboard</div>
      <div className='p-4'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Search by Customer Name or ID...'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
        />
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {filteredRequests.map((item) => (
          <BreakdownSingleCard key={item._id} breakdownRequest={item} />
        ))}
      </div>
    </div>
  );
};

export default BreakdownCard;
