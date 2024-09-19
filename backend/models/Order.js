const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
