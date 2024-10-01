import mongoose from 'mongoose';

const breakdownRequestSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    issueType: {
      type: String,
      required: true,
    },
    assignedDriver: {
      type: String,
      default: 'Pending', // Set default value as "Pending"
    },
    status: {
      type: String,
      enum: ['New', 'Accepted', 'Declined', 'Completed'],
      default: 'New', // Default status is "New"
    },
    totalDistance: {
      type: Number,
      required: true, // Optional based on your requirements
    },
    totalCharge: {
      type: Number,
      required: true, // Optional based on your requirements
    },
  },
  {
    timestamps: true,
  }
);

export const BreakdownRequest = mongoose.model('BreakdownRequest', breakdownRequestSchema);
