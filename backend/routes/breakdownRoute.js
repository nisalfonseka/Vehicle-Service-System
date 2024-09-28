import express from 'express';
import { BreakdownRequest } from '../models/breakdownModel.js';
const router = express.Router();

// Route for Save a new request
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.customerName ||
      !request.body.contactNumber ||
      !request.body.vehicleNumber ||
      !request.body.location ||
      !request.body.issueType
    ) {
      return response.status(400).send({
        message: 'Send all required Send all required fields: customerName, contactNumber, vehicleNumber, location, issueType',
      });
    }
    const newBreakdownRequest = {
      customerName: request.body.customerName,
      contactNumber: request.body.contactNumber,
      vehicleNumber: request.body.vehicleNumber,
      location: request.body.location,
      issueType: request.body.issueType,
    };

    const breakdownRequest = await BreakdownRequest.create(newBreakdownRequest);

    return response.status(201).send(breakdownRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All requests from database
router.get('/', async (request, response) => {
  try {
    const breakdownRequests = await BreakdownRequest.find({});

    return response.status(200).json({
      count: breakdownRequests.length,
      data: breakdownRequests,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One request from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const breakdownRequest = await BreakdownRequest.findById(id);

    return response.status(200).json(breakdownRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a request
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.customerName ||
      !request.body.contactNumber ||
      !request.body.vehicleNumber ||
      !request.body.location ||
      !request.body.issueType
      //!request.body.assignedDriver ||
      //!request.body.status
    ) {
      return response.status(400).send({
        message: 'Send all required Send all required fields: customerName, contactNumber, vehicleNumber, location, issueType',
      });
    }

    const { id } = request.params;

    const result = await BreakdownRequest.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Breakdown Request not found' });
    }

    return response.status(200).send({ message: 'Breakdown Request updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await BreakdownRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Breakdown Request not found' });
    }

    return response.status(200).send({ message: 'Breakdown Request deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route for Assigning a driver to a request
router.put('/:id/assign-driver', async (request, response) => {
  try {
    const { id } = request.params;
    const { assignedDriver } = request.body;

    const breakdownRequest = await BreakdownRequest.findByIdAndUpdate(
      id,
      { assignedDriver },
      { new: true }
    );

    if (!breakdownRequest) {
      return response.status(404).json({ message: 'Breakdown Request not found' });
    }

    return response.status(200).send({ message: 'Driver assigned successfully', data: breakdownRequest });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route to update a booking's status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['New', 'Accepted', 'Declined'];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: 'Invalid status' });
    }

    // Find and update the booking status
    const updatedBooking = await BreakdownRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // Ensure validators run on update
    );

    if (!updatedBooking) {
      return res.status(404).send({ message: 'Booking not found' });
    }

    res.status(200).send(updatedBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});


// Route to get books by status
router.get("/status/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ['New', 'Accepted', 'Declined'];

    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: 'Invalid status' });
    }

    const breakdownRequests = await BreakdownRequest.find({ status });

    res.status(200).json({
      count: breakdownRequests.length,
      data: breakdownRequests
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
