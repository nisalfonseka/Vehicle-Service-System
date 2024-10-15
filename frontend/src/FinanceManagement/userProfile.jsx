import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from './Navbar';
import profileImage from '../FinanceManagement/rusiru.jpg'; // Import the uploaded image

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/userRequests/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      FirstName: user.FirstName,
      LastName: user.LastName,
      UserName: user.UserName,
      Password: user.Password,
      PhoneNumber: user.PhoneNumber
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      if (!formData.FirstName || !formData.LastName || !formData.UserName || !formData.Password || !formData.PhoneNumber) {
        console.error("All fields are required");
        return;
      }

      const response = await axios.put(`http://localhost:5555/userRequests/${editingUser}`, formData);
      if (response.data) {
        setUsers(users.map(user => (user._id === editingUser ? { ...user, ...formData } : user)));
        setIsModalOpen(false);
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <NavBar />
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '38px', margin: '20px 0' }}>My Profile</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} style={cardContainerStyle}>
              <img
                src={profileImage}
                alt={`${user.FirstName} ${user.LastName}`}
                style={profileImgStyle}
              />
              <div style={userDetailsStyle}>
                <h3 style={nameStyle}>{user.FirstName} {user.LastName}</h3>
                <p><strong>Username:</strong> {user.UserName}</p>
                <p><strong>Password:</strong> {user.Password}</p>
                <p><strong>Contact Number:</strong> {user.PhoneNumber}</p>
              </div>
              <div style={actionsContainerStyle}>
                <button style={deleteButtonStyle} onClick={() => deleteUser(user._id)}>Remove</button>
                <button style={editButtonStyle} onClick={() => handleEdit(user)}>Update</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#888', fontSize: '18px' }}>No users found.</p>
        )}
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Edit User</h2>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleInputChange}
              placeholder="First Name"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleInputChange}
              placeholder="User Name"
              style={inputStyle}
              required
            />
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              placeholder="Password"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              style={inputStyle}
              required
            />
            <div style={modalActionsStyle}>
              <button style={saveButtonStyle} onClick={handleUpdateUser}>Save</button>
              <button style={cancelButtonStyle} onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline CSS Styles
const cardContainerStyle = {
  width: '320px',
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '25px'
};

const profileImgStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid #f1f1f1',
  marginBottom: '20px'
};

const userDetailsStyle = {
  textAlign: 'left',
  width: '100%',
  marginBottom: '20px'
};

const nameStyle = {
  margin: '10px 0',
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold'
};

const actionsContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
};

const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const editButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  width: '400px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

const inputStyle = {
  width: '90%',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '16px',
  transition: 'border-color 0.3s ease'
};

const modalActionsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px'
};

const saveButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const cancelButtonStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

export default UserTable;
