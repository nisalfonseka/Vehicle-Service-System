import express from "express";
import { userRequest } from "../models/user.js"; // Adjusted import statement
const userRouter = express.Router();

// Route for Save a new user request
userRouter.post("/", async (request, response) => {
  try {
    if (
      !request.body.FirstName ||
      !request.body.LastName ||
      !request.body.UserName ||
      !request.body.Password ||
      !request.body.PhoneNumber
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: FirstName, LastName, UserName, Password, PhoneNumber",
      });
    }

    const newUserRequest = {
      FirstName: request.body.FirstName,
      LastName: request.body.LastName,
      UserName: request.body.UserName,
      Password: request.body.Password, // Ensure this is hashed in production
      PhoneNumber: request.body.PhoneNumber,
    };

    const createdUserRequest = await userRequest.create(newUserRequest);

    return response.status(201).send(createdUserRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All user requests from database
userRouter.get("/", async (request, response) => {
  try {
    const allUserRequests = await userRequest.find({});

    return response.status(200).json({
      count: allUserRequests.length,
      data: allUserRequests,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One user request from database by id
userRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const userRequestData = await userRequest.findById(id);

    if (!userRequestData) {
      return response.status(404).json({ message: "User Request not found" });
    }

    return response.status(200).json(userRequestData);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a user request
userRouter.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.FirstName ||
      !request.body.LastName ||
      !request.body.UserName ||
      !request.body.Password ||
      !request.body.PhoneNumber
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: FirstName, LastName, UserName, Password, PhoneNumber",
      });
    }

    const { id } = request.params;

    const result = await userRequest.findByIdAndUpdate(id, request.body, { new: true });

    if (!result) {
      return response.status(404).json({ message: "User Request not found" });
    }

    return response
      .status(200)
      .send({ message: "User Request updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a user request
userRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await userRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "User Request not found" });
    }

    return response
      .status(200)
      .send({ message: "User Request deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for login
userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await userRequest.findOne({ UserName: username });
  
      if (user && user.Password === password) {
        // Send success response if the password matches
        res.json({ success: true });
      } else {
        // Send failure response
        res.json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
});

export default userRouter;
