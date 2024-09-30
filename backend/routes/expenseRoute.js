import express from "express";
import { expenseRequest } from "../models/expenseModel.js";
const expenseRouter = express.Router();

// Route for Save a new request
expenseRouter.post("/", async (request, response) => {
  try {
    if (
      !request.body.title||
      !request.body.amount ||
      !request.body.date||
      !request.body.type||
      !request.body.description 
      
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, amount ,date,type,description",
      });
    }

    const newexpenseRequest = {
      title: request.body.title,
      amount: request.body.amount,
      date: request.body.date,
      type: request.body.type,
      description: request.body.description ,
    };

    const createdexpenseRequest = await expenseRequest.create(newexpenseRequest);

    return response.status(201).send(createdexpenseRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
 
// Route for Get All requests from database
expenseRouter.get("/", async (request, response) => {
  try {
    const allexpenseRequest = await expenseRequest.find({ expenseRequest });

    return response.status(200).json({
      count: allexpenseRequest.length,
      data: allexpenseRequest,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One request from database by id
expenseRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const expenseRequest = await expenseRequest.findById(id);

    return response.status(200).json(expenseRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a request
expenseRouter.put("/:id", async (request, response) => {
  try {
    if (
        !request.body.title||
        !request.body.amount ||
        !request.body.date||
        !request.body.type||
        !request.body.description
    ) {
      return response.status(400).send({
        message:
         "Send all required fields: title, amount ,date,type,description",
      });
    }

    const { id } = request.params;

    const result = await expenseRequest.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Expense Request not found" });
    }

    return response
      .status(200)
      .send({ message: "Expense Request updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
expenseRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await expenseRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Expense Request not found" });
    }

    return response
      .status(200)
      .send({ message: "Expense Request deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default expenseRouter;
