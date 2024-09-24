import React, { useState } from 'react';
import ManagerHeader from '../InventoryManagement/managerHeader';
import axios from 'axios';
const AddCategoryForm = () => {
  const [categoryCode, setCategoryCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:5555/categories', {
        categoryCode,
        name,
        description
      });
      alert('Category added successfully!');
      // Reset form
      setCategoryCode('');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  return (
    <div className='flex'>
      <ManagerHeader />
      <div className="container mt-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Add New Category
          </h2>

          {statusMessage && (
            <div className="text-center text-red-600 font-semibold mb-4">
              {statusMessage}
            </div>
          )}

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="categoryCode">
              Category Code
            </label>
            <input
              type="text"
              id="categoryCode"
              value={categoryCode}
              onChange={(e) => setCategoryCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
