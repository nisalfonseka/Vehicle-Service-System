import express from "express";
import { invoiceRequest } from "../models/invoice.js";


const router = express.Router();

// Route for Save a new request
// Route for Save a new request


router.get('/totalInvoices', async (req, res) => {
  try {
    const totalInvoices = await invoiceRequest.countDocuments(); // Use the correct model here
    res.json({ totalInvoices }); // Respond with the total invoices count
  } catch (error) {
    console.error('Error fetching total invoices:', error);
    res.status(500).json({ error: 'Error fetching total invoices' });
  }
});



// Backend route (Express.js)
router.get('/totalIncome', async (req, res) => {
  try {
    const invoices = await invoiceRequest.find(); // Use the correct model name
    const totalIncome = invoices.reduce((total, invoice) => {
      const finalAmount = (invoice.amount || 0) + (invoice.taxAmount || 0) - (invoice.discountAmount || 0);
      return total + finalAmount;
    }, 0);
    
    res.json({ totalIncome });
  } catch (error) {
    console.error('Error fetching total income:', error);
    res.status(500).json({ error: 'Failed to fetch total income' });
  }
});


router.post("/", async (request, response) => {
  try {
    const {
      invoiceName,
      serviceType,
      invoiceDate,
      customerName,
      billingAddress,
      amount, // Changed from Amount to amount
      taxAmount,
      discountAmount,
      paymentStatus,
      paymentMethod, // Changed from PaymentMethod to paymentMethod
    } = request.body;

    // Validate required fields
    if (
      !invoiceName ||
      !serviceType ||
      !invoiceDate ||
      !customerName ||
      !billingAddress ||
      !amount || // Fixed field name
      !taxAmount ||
      !discountAmount ||
      !paymentStatus ||
      !paymentMethod // Fixed field name
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: invoiceName, serviceType, invoiceDate, customerName, billingAddress, amount, taxAmount, discountAmount, paymentStatus, paymentMethod",
      });
    }

    const newInvoiceRequest = {
      invoiceName,
      serviceType,
      invoiceDate,
      customerName,
      billingAddress,
      amount, // Fixed field name
      taxAmount,
      discountAmount,
      paymentStatus,
      paymentMethod, // Fixed field name
    };

    const createdInvoiceRequest = await invoiceRequest.create(newInvoiceRequest);
    return response.status(201).send(createdInvoiceRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All requests from database
router.get("/", async (request, response) => {
  try {
    const allInvoiceRequests = await invoiceRequest.find({});

    // Calculate the total amount for each invoice dynamically
    const allInvoiceRequestsWithTotal = allInvoiceRequests.map((invoice) => {
      const calculatedTotalAmount =
        invoice.Amount + invoice.taxAmount - invoice.discountAmount;
      return { ...invoice._doc, calculatedTotalAmount }; // Add the calculated total amount to each invoice
    });

    return response.status(200).json({
      count: allInvoiceRequestsWithTotal.length,
      data: allInvoiceRequestsWithTotal,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One request from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const invoice = await invoiceRequest.findById(id);

    if (!invoice) {
      return response
        .status(404)
        .json({ message: "Invoice Request not found" });
    }
  
 
   
    const calculatedTotalAmount =
      invoice.Amount + invoice.taxAmount - invoice.discountAmount;

    return response.status(200).json({
      ...invoice._doc,
      calculatedTotalAmount, // Add the calculated total amount
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a request
router.put("/:id", async (request, response) => {
  try {
    const {
      invoiceName,
      serviceType,
      invoiceDate,
      customerName,
      billingAddress,
      amount,
      taxAmount,
      discountAmount,
      paymentStatus,
      paymentMethod,
   } = request.body;
   

    if (
      !invoiceName ||
      !serviceType ||
      !invoiceDate ||
      !customerName ||
      !billingAddress ||
      !amount ||
      !taxAmount ||
      !discountAmount ||
      !paymentStatus ||
      !paymentMethod
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: invoiceName, serviceType, invoiceDate, customerName, billingAddress, Amount, taxAmount, discountAmount, paymentStatus, PaymentMethod",
      });
    }

    const { id } = request.params;

    const updatedInvoiceRequest = await invoiceRequest.findByIdAndUpdate(id, request.body, {
      new: true, // Return the updated document
    });

    if (!updatedInvoiceRequest) {
      return response
        .status(404)
        .json({ message: "Invoice Request not found" });
    }

    return response
      .status(200)
      .send({ message: "Invoice Request updated successfully", updatedInvoiceRequest });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a request
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deletedInvoiceRequest = await invoiceRequest.findByIdAndDelete(id);

    if (!deletedInvoiceRequest) {
      return response
        .status(404)
        .json({ message: "Invoice Request not found" });
    }

    return response
      .status(200)
      .send({ message: "Invoice Request deleted successfully", deletedInvoiceRequest });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/invoiceRequests", async (req, res) => {
  try {
    const invoiceRequests = await invoiceRequest.find({});
    res.json(invoiceRequests);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
