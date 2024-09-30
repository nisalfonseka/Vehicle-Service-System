import express from "express";
import { expenseRequest } from "../models/expenseModel.js";

const expenseRouter = express.Router();

// Route for getting the total expenses
expenseRouter.get("/totalExpenses", async (request, response) => {
  try {
    const totalExpenses = await expenseRequest.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const total = totalExpenses[0]?.totalAmount || 0;

    return response.status(200).json({ totalExpenses: total });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for saving a new expense request
expenseRouter.post("/", async (request, response) => {
  try {
    const { title, amount, date, description, paymentMethod } = request.body;

    // Check if all required fields are provided
    if (!title || !amount || !date || !description || !paymentMethod) {
      return response.status(400).send({
        message: "Send all required fields: title, amount, date, description, paymentMethod",
      });
    }

    const newExpenseRequest = {
      title,
      amount,
      date,
      description,
      paymentMethod, // Ensure this is included as per your model
    };

    const createdExpenseRequest = await expenseRequest.create(newExpenseRequest);

    return response.status(201).send(createdExpenseRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all expense requests from the database
expenseRouter.get("/", async (request, response) => {
  try {
    const allExpenseRequests = await expenseRequest.find(); // Remove `{ expenseRequest }`

    return response.status(200).json({
      count: allExpenseRequests.length,
      data: allExpenseRequests,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one expense request by ID
expenseRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const expense = await expenseRequest.findById(id);
    
    if (!expense) {
      return response.status(404).json({ message: "Expense Request not found" });
    }

    return response.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating an expense request
expenseRouter.put("/:id", async (request, response) => {
  try {
    const { title, amount, date, description, paymentMethod } = request.body;

    // Check if all required fields are provided
    if (!title || !amount || !date || !description || !paymentMethod) {
      return response.status(400).send({
        message: "Send all required fields: title, amount, date, description, paymentMethod",
      });
    }

    const { id } = request.params;

    const updatedExpenseRequest = await expenseRequest.findByIdAndUpdate(id, request.body, { new: true });

    if (!updatedExpenseRequest) {
      return response.status(404).json({ message: "Expense Request not found" });
    }

    return response.status(200).send({ message: "Expense Request updated successfully", data: updatedExpenseRequest });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting an expense request
expenseRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await expenseRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Expense Request not found" });
    }

    return response.status(200).send({ message: "Expense Request deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default expenseRouter;
