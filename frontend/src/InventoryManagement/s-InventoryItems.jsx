import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ManagerHeader from '../InventoryManagement/managerHeader';

const senuraInventoryItems = () => {
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
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <ManagerHeader />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center">Inventory Items</h1>
          <input
            type="text"
            placeholder="Search items by name"
            className="form-control"
            style={{ width: '300px' }}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="row">
          {filteredItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <Link to={`/items/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card">
                  {item.photo && (
                    <img
                      src={`data:image/jpeg;base64,${item.photo}`}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: LKR:{item.price.toFixed(2)}</p>
                    <p className="card-text">Quantity Available: {item.qty}</p>
                    <p className="card-text">
                      <strong>Company:</strong> {item.companyName}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {item.category?.name || 'N/A'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default senuraInventoryItems;
