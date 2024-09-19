import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagerHeader from '../../components/managerHeader';

function ItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5555/store-items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5555/store-items/item/${itemId}`);
      if (response.status === 200) {
        alert('Item deleted successfully');
        setItems(items.filter(item => item._id !== itemId));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleUpdateItem = (itemId) => {
    navigate(`/updateItem/${itemId}`);
  };

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <ManagerHeader />
      <div className="container mx-auto mt-8 px-4">
        <div className="flex justify-between mb-6">
          <h2 className="text-6xl font-semibold">Inventory Items</h2>
          <input
            type="text"
            placeholder="Search by item name"
            className="border border-gray-300 rounded-lg px-4 py-2 text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600">#</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Name</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Code</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Description</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Quantity</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Price</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Photo</th>
                <th className="px-6 py-3 text-left  font-semibold text-gray-600 text-1xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-90">
                    <td className="px-6 py-4 text-xl">{index + 1}</td>
                    <td className="px-6 py-4 text-xl text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-xl text-gray-800">{item.code}</td>
                    <td className="px-6 py-4 text-md text-gray-800">{item.description}</td>
                    <td className="px-6 py-4 text-xl text-gray-800">{item.qty}</td>
                    <td className="px-6 py-4 text-xl text-gray-800">LKR: {item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {item.photo && (
                        <img src={item.photo} alt="Item" className="w-500 h-auto rounded-md" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        onClick={() => handleUpdateItem(item._id)}
                      >
                        Update
                      </button>
                      <button
                        style={{ marginTop: '10px', marginRight: '5px' }}
                        className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-xl">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
