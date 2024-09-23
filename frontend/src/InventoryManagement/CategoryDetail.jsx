import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of history
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
      navigate('/catagory'); // Redirect to categories list after deletion
    } catch (error) {
      setError('Failed to delete category.');
      console.error('Error deleting category:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/categories/${id}/edit`); // Redirect to update page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Category Details</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {category && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <strong className="text-gray-800">Category Code:</strong>
            <p className="text-gray-600">{category.categoryCode}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-800">Name:</strong>
            <p className="text-gray-600">{category.name}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-800">Description:</strong>
            <p className="text-gray-600">{category.description}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-800">Created At:</strong>
            <p className="text-gray-600">{new Date(category.createdAt).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-800">Updated At:</strong>
            <p className="text-gray-600">{new Date(category.updatedAt).toLocaleString()}</p>
          </div>

          <div className="flex space-x-4 justify-center">
            <Link to="/catagory">
              <button className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
                Back
              </button>
            </Link>
            <button
              onClick={handleUpdate}
              className="py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
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
