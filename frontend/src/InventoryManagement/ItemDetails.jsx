import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagerHeader from '../InventoryManagement/managerHeader';

const AddItemForm = () => {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    name: '',
    code: '',
    companyName: '',
    description: '',
    qty: '',
    buyingPrice: '',
    price: '',
    category: '',
    photo: null, // Set initial value to null for file
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear specific error
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem((prev) => ({
        ...prev,
        photo: file, // Store the file object directly
      }));
      setErrors((prev) => ({ ...prev, photo: '' })); // Clear specific error
    }
  };

  // Number Validation Function (to ensure only positive integers or decimals are entered)
  const isPositiveNumber = (value) => {
    const numberRegex = /^[0-9]+(\.[0-9]+)?$/; // This regex allows only positive numbers (including decimals)
    return numberRegex.test(value);
  };

  // Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!item.name.trim()) newErrors.name = 'Name is required';
    if (!item.code.trim()) newErrors.code = 'Code is required';
    if (!item.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!item.description.trim()) newErrors.description = 'Description is required';

    // Quantity validation
    if (!isPositiveNumber(item.qty)) {
      newErrors.qty = 'Quantity must be a positive number and cannot be zero';
    } else if (item.qty <= 0) {
      newErrors.qty = 'Quantity must be greater than 0';
    }

    // Buying Price validation
    if (!isPositiveNumber(item.buyingPrice)) {
      newErrors.buyingPrice = 'Buying Price must be a positive number';
    } else if (item.buyingPrice <= 0) {
      newErrors.buyingPrice = 'Buying Price must be greater than 0';
    }

    // Selling Price validation
    if (!isPositiveNumber(item.price)) {
      newErrors.price = 'Price must be a positive number';
    } else if (item.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } 

    if (!item.category) newErrors.category = 'Please select a category';

    if (!item.photo) {
      newErrors.photo = 'Photo is required';
    } else if (item.photo.size > 1048576) {
      newErrors.photo = 'Photo size should not exceed 1MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation
    if (!validateForm()) return;

    // Create a FormData object
    const formData = new FormData();

    // Append fields to FormData
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        formData.append(key, item[key]);
      }
    }

    try {
      await axios.post('http://localhost:5555/inventory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      alert('Item added successfully!');
      navigate('/dashboard/senura'); // Redirect to items list after successful addition
    } catch (error) {
      setError('Failed to add item.');
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="flex">
      <ManagerHeader />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Item</h1>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={item.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.name && 'border-red-600'}`}
                required
              />
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="code">
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={item.code}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.code && 'border-red-600'}`}
                required
              />
              {errors.code && <p className="text-red-600">{errors.code}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={item.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.companyName && 'border-red-600'}`}
                required
              />
              {errors.companyName && <p className="text-red-600">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={item.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.description && 'border-red-600'}`}
                rows="4"
                required
              ></textarea>
              {errors.description && <p className="text-red-600">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="qty">
                Quantity
              </label>
              <input
                type="number"
                id="qty"
                name="qty"
                value={item.qty}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.qty && 'border-red-600'}`}
                required
              />
              {errors.qty && <p className="text-red-600">{errors.qty}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="buyingPrice">
                Buying Price
              </label>
              <input
                type="number"
                id="buyingPrice"
                name="buyingPrice"
                value={item.buyingPrice}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.buyingPrice && 'border-red-600'}`}
                required
              />
              {errors.buyingPrice && <p className="text-red-600">{errors.buyingPrice}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="price">
                Selling Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={item.price}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.price && 'border-red-600'}`}
                required
              />
              {errors.price && <p className="text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={item.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.category && 'border-red-600'}`}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2" htmlFor="photo">
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
                className={`w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-800 ${errors.photo && 'border-red-600'}`}
                accept="image/*"
                required
              />
              {errors.photo && <p className="text-red-600">{errors.photo}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
