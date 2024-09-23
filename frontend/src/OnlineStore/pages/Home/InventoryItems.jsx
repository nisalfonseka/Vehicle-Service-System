import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagerHeader from '../../components/managerHeader';
import { FaSearch } from 'react-icons/fa';

function ItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation
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
      await axios.delete(`http://localhost:5555/store-items/item/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
      setConfirmDelete(null);
      alert('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleUpdateItem = (itemId) => {
    navigate(`/updateItem/${itemId}`);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter items with quantity less than 4
  const lowQuantityItems = items.filter(item => item.qty < 4);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <ManagerHeader />
      <div className="flex-1 ml-64 p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-4xl font-bold">Inventory Items</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by item name"
              className="border border-gray-300 rounded-lg px-4 py-2 text-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-2 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">#</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">Code</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">Description</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">Quantity</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">Price</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-600">Photo</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-100 transition duration-150">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-gray-800">{item.code}</td>
                    <td className="px-6 py-4 text-gray-800">{item.description}</td>
                    <td className="px-6 py-4 text-gray-800">{item.qty}</td>
                    <td className="px-6 py-4 text-gray-800">LKR: {item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {item.photo && (
                        <img
                          src={`data:image/jpeg;base64,${item.photo}`}
                          alt={item.name}
                          className="w-16 h-16 rounded-md"
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-xl">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Low Quantity Items Section */}
        {lowQuantityItems.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-red-600">Low Quantity Items</h3>
            <ul className="list-disc pl-6">
              {lowQuantityItems.map(item => (
                <li key={item._id} className="mb-2">
                  <span className="font-semibold">{item.name}</span> - Quantity: {item.qty}
                </li>
              ))}
            </ul>
          </div>
        )}

        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <p>Are you sure you want to delete this item?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => handleDeleteItem(confirmDelete)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemList;
