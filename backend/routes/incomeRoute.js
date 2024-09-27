import express from "express";
import { incomeRequest } from "../models/incomeModel.js";
const incomeRouter = express.Router();

// Route for Save a new request
incomeRouter.post("/", async (request, response) => {
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

    const newincomeRequest = {
      title: request.body.title,
      amount: request.body.amount,
      date: request.body.date,
      type: request.body.type,
      description: request.body.description ,
    };

    const createdincomeRequest = await incomeRequest.create(newincomeRequest);

    return response.status(201).send(createdincomeRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
 
// Route for Get All requests from database
incomeRouter.get("/", async (request, response) => {
  try {
    const allincomeRequest = await incomeRequest.find({ incomeRequest });

    return response.status(200).json({
      count: allincomeRequest.length,
      data: allincomeRequest,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One request from database by id
incomeRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const incomeRequest = await incomeRequest.findById(id);

    return response.status(200).json(incomeRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a request
incomeRouter.put("/:id", async (request, response) => {
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

    const result = await incomeRequest.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Income Request not found" });
    }

    return response
      .status(200)
      .send({ message: "Income Request updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
incomeRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await incomeRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Income Request not found" });
    }

    return response
      .status(200)
      .send({ message: "Income Request deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default incomeRouter;
