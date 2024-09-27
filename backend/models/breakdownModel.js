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
      enum: ['New', 'Accepted', 'Declined'],
      default: 'New', // Default status is "New"
    },
  },
  {
    timestamps: true,
  }
);

export const BreakdownRequest = mongoose.model('BreakdownRequest', breakdownRequestSchema);
