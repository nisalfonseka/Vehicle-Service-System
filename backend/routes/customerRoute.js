import express from 'express';
import { CUSTOMER } from '../models/customerModel.js';

const router = express.Router();

// Route for Save a new CUSTOMER
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.customerName ||
      !request.body.email ||
      !request.body.mobileNumber ||
      !request.body.vehicleNumber ||
      !request.body.subject 

    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const  {
      customerName,
      email, 
      mobileNumber, 
      vehicleNumber,
      subject,
        
    }=request.body;

    const customer = await CUSTOMER.create({customerName,email,mobileNumber,vehicleNumber,subject,});

    return response.status(201).send(customer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All CUSTOMER from database
router.get('/', async (request, response) => {
  try {
    const customer = await CUSTOMER.find({});

    return response.status(200).json({
      count: customer.length,
      data: customer
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One CUSTOMER from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const customer = await CUSTOMER.findById(id);

    return response.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a CUSTOMER
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.customerName ||
      !request.body.email ||
      !request.body. mobileNumber ||
      !request.body.vehicleNumber ||
      !request.body.subject 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;
    const 
    {customerName , email,  mobileNumber, vehicleNumber,subject} = request.body

    const result = await CUSTOMER.findByIdAndUpdate(id,
      {customerName , email,  mobileNumber, vehicleNumber,subject}, {new:true});

    if (!result) {
      return response.status(404).json({ message: 'CUSTOMER not found' });
    }

    return response.status(200).send({ message: 'CUSTOMER updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a CUSTOMER
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await CUSTOMER.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'CUSTOMER not found' });
    }

    return response.status(200).send({ message: 'CUSTOMER deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
