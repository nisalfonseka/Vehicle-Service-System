import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route for Save a new Book for database
router.post("/",async (request, response) => {
  try {
    if (
      !request.body.customerName ||
      !request.body.vehicleType ||
      !request.body.vehicleNumber ||
      !request.body.contactNumber ||
      !request.body.selectedServices ||
      !request.body.totalCost ||
      !request.body.totalTime ||
      !request.body.selectedDate ||
      !request.body.selectedTimeSlot
      
    ) {
      return response.status(400).send({
        message: "send all required fields",
      });
    }
    const  {
      customerName,
      vehicleType,
      vehicleNumber,
      contactNumber,
      selectedServices,
      totalCost,
      totalTime,
      selectedDate,
      selectedTimeSlot


      } = request.body;


    const book = await Book.create({customerName,vehicleType,vehicleNumber,contactNumber,selectedServices,totalCost,totalTime,selectedDate,selectedTimeSlot});

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get all Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get one Book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route for update a Book from database
router.put("/:id",async (request, response) => {
  try {
    if (
      !request.body.customerName ||
      !request.body.vehicleType ||
      !request.body.vehicleNumber ||
      !request.body.contactNumber ||
      !request.body.selectedServices ||
      !request.body.totalCost ||
      !request.body.totalTime ||
      !request.body.selectedDate ||
      !request.body.selectedTimeSlot 
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = request.params;

    const {customerName,vehicleType,vehicleNumber,contactNumber,selectedServices,totalCost,totalTime,selectedDate,selectedTimeSlot} = request.body
    

    const result = await Book.findByIdAndUpdate(id, {customerName,vehicleType,vehicleNumber,contactNumber,selectedServices,totalCost,totalTime,selectedDate,selectedTimeSlot}, { new: true });

    if (!result) {
      return response.status(404).json({ message: "Booking not found" });
    }
    return response.status(200).send({ message: "Booking updated successfully!" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Booking not found" });
    }

    return response.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
