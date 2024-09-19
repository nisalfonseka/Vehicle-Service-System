import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../mycss/CardManagementPage.css';

const CardManagementPage = () => {
  const [cards, setCards] = useState([]);
  const [userId, setUserId] = useState(''); // Manually entering for now
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (userId) {
      fetchCards();
    }
  }, [userId]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`/api/saved-cards/${userId}`);
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cards.length >= 3) {
      alert('You can only add up to 3 cards.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5555/save-card', { ...cardDetails, userId });
      setCards([...cards, response.data]);
      setCardDetails({ name: '', cardNumber: '', expirationDate: '', cvv: '' });
    } catch (error) {
      console.error('Failed to save card:', error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`/api/saved-cards/${cardId}`);
      setCards(cards.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  const handleUpdate = (cardId) => {
    // Add your update logic here
    alert('Update functionality to be implemented');
  };

  return (
    <div className="card-management-page">
      <div className="add-card-form">
        <h2>Add New Card</h2>
        <input
          type="text"
          name="userId"
          value={userId}
          placeholder="Enter User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            placeholder="Name on Card"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            placeholder="Card Number"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="expirationDate"
            value={cardDetails.expirationDate}
            placeholder="Expiration Date (MM/YY)"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            placeholder="CVV"
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={cards.length >= 3}>Add Card</button>
        </form>
      </div>

      <div className="saved-cards">
        <h2>Saved Cards</h2>
        {cards.length === 0 && <p>No cards saved.</p>}
        <div className="cards-container">
          {cards.map((card) => (
            <div key={card._id} className="card">
              <div className="card-info">
                <p className="card-number">{card.cardNumber.replace(/.(?=.{4})/g, '*')}</p>
                <p className="card-name">{card.name}</p>
                <p className="card-expiration">{card.expirationDate}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => handleUpdate(card._id)}>Update</button>
                <button onClick={() => handleDelete(card._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardManagementPage;
