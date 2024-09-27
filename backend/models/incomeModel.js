import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
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
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const incomeRequest = mongoose.model("incomeRequests", incomeSchema);
