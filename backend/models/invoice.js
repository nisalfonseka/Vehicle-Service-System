import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceName: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
      set: (dateString) => {
        // Assuming dateString is in "DD/MM/YYYY" format
        const [day, month, year] = dateString.split("/");
        return new Date(`${year}-${month}-${day}`);
      },
    },
    customerName: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['Paid', 'Pending', 'Overdue'],  // Example enum, you can modify it
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

export const invoiceRequest = mongoose.model("invoiceRequests", invoiceSchema);
