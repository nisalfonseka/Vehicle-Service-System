import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const customerSchema = mongoose.Schema(
  {
    customer_id:{
      type: Number,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    // New fields added
    category: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(uniqueValidator, { message: 'Error, {PATH} is Already Exists.' });

// Pre-save middleware to generate s_id
customerSchema.pre('save', async function(next) {
    try {
        // Generate a random 6-digit numeric ID
        const generatedId = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
        this.customer_id = generatedId; // Assign generated ID to the s_id field
        next(); // Continue with the save operation
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

export const CUSTOMER = mongoose.model('cus', customerSchema);
