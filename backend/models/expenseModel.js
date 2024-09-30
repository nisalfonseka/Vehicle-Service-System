import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const expenseRequest = mongoose.model("expenseRequests", expenseSchema);
