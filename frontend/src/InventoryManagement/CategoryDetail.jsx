import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        setError('Failed to fetch category.');
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/categories/${id}`);
      navigate('/catagory');
    } catch (error) {
      setError('Failed to delete category.');
      console.error('Error deleting category:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/categories/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Category Details</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {category && (
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-xl w-full">
          <div className="mb-6">
            <strong className="text-xl font-semibold text-gray-800">Category Code:</strong>
            <p className="text-gray-600">{category.categoryCode}</p>
          </div>
          <div className="mb-6">
            <strong className="text-xl font-semibold text-gray-800">Name:</strong>
            <p className="text-gray-600">{category.name}</p>
          </div>
          <div className="mb-6">
            <strong className="text-xl font-semibold text-gray-800">Description:</strong>
            <p className="text-gray-600">{category.description}</p>
          </div>
          <div className="mb-6">
            <strong className="text-xl font-semibold text-gray-800">Created At:</strong>
            <p className="text-gray-600">{new Date(category.createdAt).toLocaleString()}</p>
          </div>
          <div className="mb-6">
            <strong className="text-xl font-semibold text-gray-800">Updated At:</strong>
            <p className="text-gray-600">{new Date(category.updatedAt).toLocaleString()}</p>
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/catagory">
              <button className="py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300">
                Back
              </button>
            </Link>
            <button
              onClick={handleUpdate}
              className="py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
