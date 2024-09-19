import mongoose from 'mongoose';

// Define the schema
const StoreItems = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true } // Store Base64 string
});

// Export the model using ES module syntax
const StoreDatabase = mongoose.model('StoreDatabase', StoreItems);

export default StoreDatabase;
