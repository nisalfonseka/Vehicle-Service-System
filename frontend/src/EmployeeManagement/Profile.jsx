import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    role: '',
    password: '', // Added password field
    phone: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    // Fetch the admin's current profile data
    axios.get('http://localhost:5555/Profile') // Make sure this matches your backend route
      .then((response) => {
        setAdmin(response.data);
        setAvatarPreview(response.data.avatar ? `http://localhost:5555/${response.data.avatar}` : '');
      })
      .catch((error) => {
        console.error('Error fetching admin profile:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarPreview(reader.result); // Preview the image before upload
    };

    if (file) {
      reader.readAsDataURL(file);
      setAdmin({ ...admin, avatar: file }); // Store the file in the state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(admin).forEach((key) => {
      formData.append(key, admin[key]);
    });

    try {
      await axios.put('http://localhost:5555/Profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
  
      // Re-fetch the profile data to reflect updates
      const response = await axios.get('http://localhost:5555/Profile');
      setAdmin(response.data);
      // Update avatarPreview based on the response
      setAvatarPreview(response.data.avatar ? `http://localhost:5555/${response.data.avatar}` : '');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('C:\\Users\\januda anuk\\Documents\\ITP y2s2\\Employee-management-MERN-stack\\frontend\\src\\assets\\PofilepageBI.jpg')" }}>
      <div className="bg-white rounded-lg shadow-lg p-10 w-96 relative overflow-hidden">
        <h2 className="text-gray-800 mb-5 text-2xl font-bold text-center">Admin Profile</h2>
        <div className="relative mb-7">
          <img
            src={avatarPreview || 'https://via.placeholder.com/150'}
            alt="Admin Avatar"
            className="w-44 h-44 rounded-full border-4 border-blue-500 object-cover transition-transform duration-300 transform hover:scale-105 shadow-lg"
          />
          {isEditing && (
            <label className="inline-block py-3 px-6 bg-blue-500 text-white rounded-md cursor-pointer z-10">
              Choose Picture
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="mt-3">
          {['name', 'email', 'role', 'phone'].map((field, index) => (
            <div className="mb-5 text-left" key={index}>
              <span className="block font-bold text-gray-800 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
              {isEditing ? (
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  value={admin[field]}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="block p-2 text-gray-700">{admin[field]}</span>
              )}
            </div>
          ))}
          <div className="mb-5 text-left">
            <span className="block font-bold text-gray-800 mb-1">Password:</span>
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <span className="block p-2 text-gray-700">******</span>
            )}
          </div>
          {isEditing && (
            <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md transition duration-300 transform hover:bg-green-600" onClick={handleSubmit}>Save Changes</button>
          )}
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className="w-full py-3 bg-blue-500 text-white rounded-md mt-2 transition duration-300 transform hover:bg-blue-600">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
