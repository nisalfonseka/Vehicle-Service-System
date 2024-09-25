import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
  const { id } = useParams(); // Get item ID from URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [updatedItem, setUpdatedItem] = useState({}); // For handling updates
  const [categories, setCategories] = useState([]); // To store available categories

  // Fetch item details and available categories
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemResponse = await axios.get(`http://localhost:5555/inventory-items/${id}`);
        setItem(itemResponse.data);
        setUpdatedItem(itemResponse.data); // Initialize with fetched data

        const categoriesResponse = await axios.get('http://localhost:5555/categories');
        setCategories(categoriesResponse.data); // Set available categories
      } catch (error) {
        setError('Error fetching item or category details');
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/inventory-items/${id}`);
      alert('Item deleted successfully');
      navigate('/'); // Redirect back to the inventory list
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5555/inventory-items/${id}`, updatedItem);
      alert('Item updated successfully');
      setShowModal(false); // Close the modal after successful update
      navigate(`/items/${id}`); // Refresh item details page after update
    } catch (error) {
      alert('Error updating item');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat._id === e.target.value);
    setUpdatedItem({ ...updatedItem, category: selectedCategory });
  };

  if (error) return <div>{error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      
      {item.photo && (
        <img
          src={`data:image/jpeg;base64,${item.photo}`}
          alt={item.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="mt-2">Price: LKR {item.price.toFixed(2)}</p>
        <p>Quantity: {item.qty}</p>
        <p>Description: {item.description}</p>
        <p>Company: {item.companyName}</p>
        <p>Category: {item.category?.name || 'N/A'}</p>
      </div>

      <div className="flex justify-between mb-6">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => navigate(-1)} // Back button
        >
          Back
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          onClick={() => setShowModal(true)}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {/* Modal for updating the item */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Item</h2>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedItem.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedItem.price || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  name="qty"
                  value={updatedItem.qty || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={updatedItem.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Company</label>
                <input
                  type="text"
                  name="companyName"
                  value={updatedItem.companyName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={updatedItem.category?._id || ''}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  type="button"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
