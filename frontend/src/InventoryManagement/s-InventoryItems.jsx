import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ManagerHeader from '../InventoryManagement/managerHeader';

const SenuraInventoryItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // For displaying filtered results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // To store the search query

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5555/inventory-items');
        setItems(response.data);
        setFilteredItems(response.data); // Initialize filtered items
        setLoading(false);
      } catch (error) {
        setError('Error fetching inventory items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter items based on the search query
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-6">{error}</div>;
  }

  return (
    <div className="flex">
      <ManagerHeader />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Items</h1>
          <input
            type="text"
            placeholder="Search items by name"
            className="py-2 px-4 w-64 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={`/items/${item._id}`} className="block">
                {item.photo && (
                  <img
                    src={`data:image/jpeg;base64,${item.photo}`}
                    className="rounded-t-lg w-full h-48 object-cover"
                    alt={item.name}
                  />
                )}
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h5>
                  <p className="text-gray-600 mb-1">Price: LKR {item.price.toFixed(2)}</p>
                  <p className="text-gray-600 mb-1">Quantity Available: {item.qty}</p>
                  <p className="text-gray-600 mb-1"><strong>Company:</strong> {item.companyName}</p>
                  <p className="text-gray-600 mb-1"><strong>Category:</strong> {item.category?.name || 'N/A'}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SenuraInventoryItems;
