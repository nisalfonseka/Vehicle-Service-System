import React, { useEffect, useState } from "react";
import axios from "axios";
import '../FinanceManagement/userProfile.css'; // Import custom CSS for styling
import profileImage from '../FinanceManagement/rusiru.jpg'; // Import the uploaded image

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Store the user being edited
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    Password: "",
    PhoneNumber: ""
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5555/userRequests");
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Delete user function
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/userRequests/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open edit form with user data
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      FirstName: user.FirstName,
      LastName: user.LastName,
      UserName: user.UserName,
      Password: user.Password,
      PhoneNumber: user.PhoneNumber
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle user update
  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5555/userRequests/${editingUser}`, formData);
      setUsers(users.map(user => (user._id === editingUser ? { ...user, ...formData } : user)));
      setEditingUser(null); // Close the edit form after updating
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-container">
      <h2 className="heading">My Profile</h2>
      <div className="user-cards">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="user-card">
              {/* Profile Image */}
              <img
                src={profileImage} // Use imported image
                alt={`${user.FirstName} ${user.LastName}`}
                className="profile-img"
              />
              <div className="user-details">
                <h3>{user.FirstName} {user.LastName}</h3>
                <p><strong>Username:</strong> {user.UserName}</p>
                <p><strong>Password:</strong> {user.Password}</p>
                <p><strong>Contact Number:</strong> {user.PhoneNumber}</p>
              </div>
              <div className="actions">
                <button className="delete-btn" onClick={() => deleteUser(user._id)}>Remove</button>
                <button className="edit-btn" onClick={() => handleEdit(user)}>Update</button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      {/* Modal for editing user */}
      {editingUser && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Edit My Profile</h3>
            <form className="edit-form">
              <label>First Name</label>
              <input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleInputChange}
              />
              <label>Last Name</label>
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleInputChange}
              />
              <label>Username</label>
              <input
                type="text"
                name="UserName"
                value={formData.UserName}
                onChange={handleInputChange}
              />
              <label>Password</label>
              <input
                type="text"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
              />
              <label>Phone Number</label>
              <input
                type="text"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
              />
              <div className="form-actions">
                <button type="button" className="update-btn" onClick={handleUpdateUser}>Update</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
