import React, { useState } from 'react';
import axios from 'axios';
import ManagerHeader from './managerHeader';
import { convertToBase64 } from '../utils/base64Converter';

function AddItemForm() {
  const [item, setItem] = useState({
    name: '',
    code: '',
    description: '',
    qty: 0,
    price: 0,
    photo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'price' || name === 'qty') && value < 0) {
      setItem({ ...item, [name]: 0 });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setItem({ ...item, photo: base64 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5555/store-items/add', item);
      alert('Item added successfully!');
      setItem({
        name: '',
        code: '',
        description: '',
        qty: 0,
        price: 0,
        photo: ''
      });
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="flex">
      {/* ManagerHeader will take up a fixed width on the left */}
      <div className="w-1/4">
        <ManagerHeader />
      </div>

      {/* Form will take up the remaining space on the right */}
      <div className="w-3/4 max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Item Code</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="code"
              name="code"
              value={item.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Item Description</label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="qty" className="block text-sm font-medium text-gray-700">Item Quantity</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="qty"
              name="qty"
              value={item.qty}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Item Price</label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="price"
              name="price"
              value={item.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Item Photo</label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
