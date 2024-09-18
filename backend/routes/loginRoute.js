import express from "express";
import { User } from "../models/loginModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Route for user registration (with username)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for required fields
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Username, email, and password are required" });
    }

    // Check if user with the same email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send({ message: "Email already registered" });
    }

    // Check if user with the same username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).send({ message: "Username already taken" });
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    // Respond with user data (excluding password) and token
    const token = generateToken(user._id);
    return res.status(201).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for user login (using email and password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Respond with user data (excluding password) and token
    const token = generateToken(user._id);
    return res.status(200).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

export default router;
