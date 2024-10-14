import React, { useState } from 'react';

const DeleteCardModal = ({ cardId, onClose, onDelete }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError(''); // Reset the error message
    
    // Fetch the stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Validate the input fields (basic check)
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // Check if the input matches the stored credentials
    if (storedUser && username === storedUser.username && password === storedUser.password) {
      try {
        // Call the delete function if credentials are correct
        await onDelete(cardId);
      } catch (err) {
        // Handle any errors from the delete function (e.g., API failure)
        setError('An error occurred while deleting the card. Please try again.');
      }
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Please enter your username and password to confirm deletion:</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleSubmit}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteCardModal;
