import { useState, useEffect } from 'react';
import axios from 'axios';
import '../mycss/CardManagementPage.css';

const CardManagementPage = () => {
  const [cards, setCards] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [editCard, setEditCard] = useState(null); // To track the card being edited
  const [userProfile, setUserProfile] = useState(null); // Store user profile details
  const [loading, setLoading] = useState(false); // To manage loading state

  useEffect(() => {
    // Fetch the logged-in user's information
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log("Logged In User:", loggedInUser); // Verify the structure and field names

    if (loggedInUser) {
      setUserProfile(loggedInUser); // Set user profile with the logged-in user details
      console.log("User Profile Set:", loggedInUser); // Log user profile

      fetchCards(loggedInUser.userId); // Fetch cards for the logged-in user
    } else {
      console.error('User is not logged in or user data is missing.');
    }
  }, []);

  const fetchCards = async (userId) => {
    setLoading(true);
    console.log("Fetching cards for User ID:", userId); // Log the user ID used for fetching cards
    try {
      const response = await axios.get(`http://localhost:5555/api/cards/${userId}`); // Fetch cards based on userId
      console.log("Fetched Cards:", response.data); // Log fetched card data
      setCards(response.data);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cards.length >= 3 && !editCard) {
      alert('You can only add up to 3 cards.');
      return;
    }

    try {
      if (editCard) {
        // Update existing card
        const response = await axios.put(`http://localhost:5555/api/cards/${userProfile.userId}/${editCard._id}`, cardDetails); // Use specific route for updating card
        console.log("Updated Card:", response.data); // Log updated card data
        setCards(cards.map(card => (card._id === response.data._id ? response.data : card)));
        setEditCard(null);
      } else {
        // Add new card
        const response = await axios.post(`http://localhost:5555/api/cards/${userProfile.userId}`, cardDetails); // Use specific route for adding new card
        console.log("Added New Card:", response.data); // Log new card data
        setCards([...cards, response.data]);
      }
      setCardDetails({ name: '', cardNumber: '', expirationDate: '', cvv: '' });
    } catch (error) {
      console.error('Failed to save/update card:', error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:5555/api/cards/${userProfile.userId}/${cardId}`); // Use specific route for deleting card
      console.log("Deleted Card ID:", cardId); // Log deleted card ID
      setCards(cards.filter(card => card._id !== cardId));
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  const handleUpdate = (card) => {
    setCardDetails({
      name: card.name,
      cardNumber: card.cardNumber,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
    });
    setEditCard(card);
  };

  return (
    <div className="card-management-page p-4">
      

      {/* Add/Edit Card Form */}
      <div className="add-card-form">
        <h2>{editCard ? 'Update Card' : 'Add New Card'}</h2>
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
          <button type="submit" disabled={cards.length >= 3 && !editCard}>
            {editCard ? 'Update Card' : 'Add Card'}
          </button>
          {editCard && (
            <button type="button" onClick={() => setEditCard(null)}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Saved Cards Section */}
      <div className="saved-cards">
        <h2>Saved Cards</h2>
        {loading ? <p>Loading...</p> : cards.length === 0 ? <p>No cards saved.</p> : (
          <div className="cards-container">
            {cards.map(card => (
              <div key={card._id} className="card">
                <div className="card-info">
                  <p className="card-number">{card.cardNumber.replace(/.(?=.{4})/g, '*')}</p>
                  <p className="card-name">{card.name}</p>
                  <p className="card-expiration">{card.expirationDate}</p>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleUpdate(card)}>Update</button>
                  <button onClick={() => handleDelete(card._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardManagementPage;
