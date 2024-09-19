import mongoose from 'mongoose';

// Define the schema
const SavedCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  name: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

// Export the model using ES module syntax
const SavedCard = mongoose.model('SavedCard', SavedCardSchema);
export default SavedCard;
