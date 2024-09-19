import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: '',
    code: '',
    description: '',
    qty: '',
    price: '',
    photo: ''
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/store-items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'price' || name === 'qty') && value < 0) {
      setItem({ ...item, [name]: 0 });  // Set to 0 if the value is negative
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/store-items/item/${id}`, item);
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Update Item</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="itemName"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700">Item Code</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="itemCode"
            name="code"
            value={item.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">Item Description</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="itemDescription"
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemQty" className="block text-sm font-medium text-gray-700">Item Quantity</label>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="itemQty"
            name="qty"
            value={item.qty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700">Item Price</label>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="itemPrice"
            name="price"
            value={item.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="itemPhoto" className="block text-sm font-medium text-gray-700">Item Photo (Base64)</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="itemPhoto"
            name="photo"
            value={item.photo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Item
          </button>
          <Link
            to="/items"
            className="bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Item List
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateItem;
