import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemDetailsssss = () => {
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
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
        {item.photo && (
          <img
            src={`data:image/jpeg;base64,${item.photo}`}
            className="w-full h-64 object-cover"
            alt={item.name}
          />
        )}
        <div className="p-6">
          <h5 className="text-2xl font-semibold mb-2">{item.name}</h5>
          <p className="text-gray-700 mb-1">Price: LKR {item.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-1">Quantity: {item.qty}</p>
          <p className="text-gray-700 mb-1">Description: {item.description}</p>
          <p className="text-gray-700 mb-1">Company: {item.companyName}</p>
          <p className="text-gray-700 mb-1">Category: {item.category?.name || 'N/A'}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => setShowModal(true)}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {/* Modal for updating the item */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedItem.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedItem.price || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="qty"
                  value={updatedItem.qty || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={updatedItem.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="companyName"
                  value={updatedItem.companyName || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={updatedItem.category?._id || ''}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border rounded text-gray-700"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailsssss;
