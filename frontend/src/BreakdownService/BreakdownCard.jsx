import { useEffect, useState } from 'react';
import axios from 'axios';
import BreakdownSingleCard from './BreakdownSingleCard';
import { BiSearch } from 'react-icons/bi'; // Importing search icon

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
    <div className="bg-gray-100 min-h-screen py-8"> {/* Updated container */}
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-4xl font-bold text-center mb-6">
          Breakdown Service Dashboard
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by Customer Name or ID..."
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
            <BiSearch className="w-5 h-5" />
          </span>
        </div>

        {/* Container for Breakdown Cards */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRequests.map((item) => (
            <BreakdownSingleCard key={item._id} breakdownRequest={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakdownCard;
