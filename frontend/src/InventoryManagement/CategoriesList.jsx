import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation
import ManagerHeader from '../InventoryManagement/managerHeader';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5555/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Failed to fetch categories.');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='flex'>
        <ManagerHeader />
    <div className=" justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Categories</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left">Category Code</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Updated At</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="py-2 px-4 border-b">{category.categoryCode}</td>
                <td className="py-2 px-4 border-b">{category.name}</td>
                <td className="py-2 px-4 border-b">{category.description}</td>
                <td className="py-2 px-4 border-b">{new Date(category.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{new Date(category.updatedAt).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/categories/${category._id}`}>
                    <button className="py-1 px-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                      See Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default CategoriesList;
