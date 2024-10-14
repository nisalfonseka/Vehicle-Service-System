import nodemailer from 'nodemailer';
import express from 'express';
import dotenv from 'dotenv';
import { incomeRequest } from '../models/incomeModel.js';

const incomeRouter = express.Router();

dotenv.config();


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // use app password instead of email password
  },
});

// Example route to send an email
incomeRouter.post('/send-email', async (req, res) => {
  const { to, subject, text, attachment } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    attachments: attachment ? [{
      filename: attachment.filename,
      content: attachment.content,
      encoding: 'base64',
    }] : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response : error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send email.',
      error: error.message || 'Unknown error',
    });
  }
});

// Route for Save a new request
incomeRouter.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.amount ||
      !request.body.date ||
      !request.body.type ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, amount, date, type, description',
      });
    }

    const newIncomeRequest = {
      title: request.body.title,
      amount: request.body.amount,
      date: request.body.date,
      type: request.body.type,
      description: request.body.description,
    };

    const createdIncomeRequest = await incomeRequest.create(newIncomeRequest);

    return response.status(201).send(createdIncomeRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All requests from database
incomeRouter.get('/', async (request, response) => {
  try {
    const allIncomeRequest = await incomeRequest.find({});

    return response.status(200).json({
      count: allIncomeRequest.length,
      data: allIncomeRequest,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One request from database by id
incomeRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const incomeRequest = await incomeRequest.findById(id);

    if (!incomeRequest) {
      return response.status(404).json({ message: 'Income Request not found' });
    }

    return response.status(200).json(incomeRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a request
incomeRouter.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.amount ||
      !request.body.date ||
      !request.body.type ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, amount, date, type, description',
      });
    }

    const { id } = request.params;

    const result = await incomeRequest.findByIdAndUpdate(id, request.body, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Income Request not found' });
    }

    return response.status(200).send({ message: 'Income Request updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a request
incomeRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await incomeRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Income Request not found' });
    }

    return response.status(200).send({ message: 'Income Request deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default incomeRouter;
