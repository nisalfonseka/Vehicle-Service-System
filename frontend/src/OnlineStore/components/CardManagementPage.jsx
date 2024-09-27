import { useState, useEffect } from 'react';
import axios from 'axios';


const CardManagementPage = () => {
  const [cards, setCards] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [editCard, setEditCard] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUserProfile(loggedInUser);
      fetchCards(loggedInUser.userId);
    } else {
      console.error('User is not logged in or user data is missing.');
    }
  }, []);

  const fetchCards = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5555/api/cards/${userId}`);
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
        const response = await axios.put(`http://localhost:5555/api/cards/${userProfile.userId}/${editCard._id}`, cardDetails);
        setCards(cards.map(card => (card._id === response.data._id ? response.data : card)));
        setEditCard(null);
      } else {
        const response = await axios.post(`http://localhost:5555/api/cards/${userProfile.userId}`, cardDetails);
        setCards([...cards, response.data]);
      }
      setCardDetails({ name: '', cardNumber: '', expirationDate: '', cvv: '' });
    } catch (error) {
      console.error('Failed to save/update card:', error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:5555/api/cards/${userProfile.userId}/${cardId}`);
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

  const handleCancel = () => {
    setEditCard(null);
    setCardDetails({ name: '', cardNumber: '', expirationDate: '', cvv: '' }); // Clear the form
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side: Saved Cards */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Saved Cards</h2>
        {loading ? <p>Loading...</p> : cards.length === 0 ? <p>No cards saved.</p> : (
          <div className="space-y-4">
            {cards.map(card => (
              <div key={card._id} className="flex justify-between items-center p-4 border-b">
                <div>
                  <p className="text-xl">{card.cardNumber.replace(/.(?=.{4})/g, '*')}</p>
                  <p className="text-gray-600">{card.name}</p>
                  <p className="text-gray-500">{card.expirationDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleUpdate(card)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Update</button>
                  <button onClick={() => handleDelete(card._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Add/Edit Card Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{editCard ? 'Update Card' : 'Add New Card'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            placeholder="Name on Card"
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            placeholder="Card Number"
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="expirationDate"
            value={cardDetails.expirationDate}
            placeholder="Expiration Date (MM/YY)"
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            placeholder="CVV"
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={cards.length >= 3 && !editCard}>
              {editCard ? 'Update Card' : 'Add Card'}
            </button>
            {editCard && (
              <button type="button" onClick={handleCancel} className="text-gray-500 hover:underline">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardManagementPage;
