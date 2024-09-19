const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedCardSchema = new Schema({
  userId: { type: String , required: true },
  name: { type: String , required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

module.exports = mongoose.model('SavedCard', SavedCardSchema);
