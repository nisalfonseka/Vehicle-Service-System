import mongoose from 'mongoose';

// Define the schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerInfo: {
    name: String,
    address: String,
    phone: String,
    email: String,
  },
  items: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  paymentInfo: {
    cardNumber: String,
    expirationDate: String,
    cvv: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  
}, { timestamps: true });

// Export the model using ES module syntax
const Order = mongoose.model('Order', orderSchema);
export default Order;
