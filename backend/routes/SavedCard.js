import express from 'express';
import SavedCard from '../models/SavedCard.js'; // Assuming you have a SavedCard model

const router = express.Router();

// Your routes will go here...



// Route to save card details
router.post('/save-card', async (req, res) => {
  try {
    const { userId, name, cardNumber, expirationDate, cvv } = req.body;
    const newCard = new SavedCard({ userId, name, cardNumber, expirationDate, cvv });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save card details' });
  }
});

// Route to fetch saved card details
router.get('/saved-cards/:userId', async (req, res) => {
    try {
      const savedCards = await SavedCard.find({ userId: req.params.userId });
      res.json(savedCards);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch saved cards' });
    }
  });

  export default router;
