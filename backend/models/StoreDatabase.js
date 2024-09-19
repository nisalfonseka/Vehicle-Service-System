// models/StoreDatabase.js

const mongoose = require('mongoose');

const StoreItems = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true } // Store Base64 string
});

module.exports = mongoose.model('StoreDatabase', StoreItems);
