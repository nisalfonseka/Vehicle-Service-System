const mongoose = require('mongoose');

const storeItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String } // Store Base64 string
});

module.exports = mongoose.model('StoreItem', storeItemSchema);
