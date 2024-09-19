import express from 'express';
import SavedCard from '../models/SavedCard.js'; // Assuming you have a SavedCard model

const router = express.Router();



// Create a new card by userId
router.post('/cards/:userId', async (req, res) => {
  try {
    const { name, cardNumber, expirationDate, cvv } = req.body;
    const userId = req.params.userId;
    
    const savedCard = new SavedCard({ userId, name, cardNumber, expirationDate, cvv });
    await savedCard.save();
    
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch card(s) by userId
router.get('/cards/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const cards = await SavedCard.find({ userId });
    
    if (cards.length === 0) {
      return res.status(404).json({ message: 'No cards found for this user.' });
    }
    
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update card by userId (Assuming only one card per userId for simplicity)
router.put('/cards/:userId/:cardId', async (req, res) => {
  try {
    const { name, cardNumber, expirationDate, cvv } = req.body;
    const { userId, cardId } = req.params;
    
    const updatedCard = await SavedCard.findOneAndUpdate(
      { _id: cardId, userId },
      { name, cardNumber, expirationDate, cvv },
      { new: true, runValidators: true }
    );
    
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found or does not belong to this user.' });
    }
    
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete card by userId (Assuming only one card per userId for simplicity)
router.delete('/cards/:userId/:cardId', async (req, res) => {
  try {
    const { userId, cardId } = req.params;
    
    const deletedCard = await SavedCard.findOneAndDelete({ _id: cardId, userId });
    
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found or does not belong to this user.' });
    }
    
    res.status(200).json({ message: 'Card deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

  export default router;
