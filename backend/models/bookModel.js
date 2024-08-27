import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
  
    vehicleNumber: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: false,
      
    },

    selectedServices: {
      type: [String],
      required: false,
      
    },
    

    totalCost: {
      type: String,
      required: false,
      
    },

    totalTime: {
      type: String,
      required: false,
      
    },

    selectedDate: {
      type: String,
      required: false,
      
    },

    selectedTimeSlot: {
      type: String,
      required: false,
      
    },
    timeSlotsAvailability: {
      type: String,
      required: false,
      
    },
    status: {
      type: String,
      enum: ['New', 'Confirmed', 'Declined'],
      default: 'New'
    }
   
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("cat", bookSchema);
