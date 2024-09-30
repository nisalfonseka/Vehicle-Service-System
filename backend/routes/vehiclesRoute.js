import express from 'express';
import { Vehicle } from '../models/vehicleModel.js';

const router = express.Router();

// Route for Save a new Vehicle
// Route for Save a new Vehicle
router.post('/', async (request, response) => {
  try {
    const { vehicleNo, chassisNo, vehicleType, fuelType, year, lastMaintenance, driverEmail } = request.body;

    // Check if all required fields are provided
    if (!vehicleNo || !chassisNo || !vehicleType || !fuelType || !year || !lastMaintenance || !driverEmail) {
      return response.status(400).send({
        message: 'Send all required fields: vehicleNo, chassisNo, vehicleType, fuelType, year, lastMaintenance, driverEmail',
      });
    }

    // Create new vehicle object
    const newVehicle = {
      vehicleNo,
      chassisNo,
      vehicleType,
      fuelType,
      year,
      lastMaintenance,
      driverEmail, // Include driverEmail here
    };

    const vehicle = await Vehicle.create(newVehicle);

    return response.status(201).send(vehicle);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});





// Route for Get All Vehicles from the database
router.get('/', async (request, response) => {
  try {
    const vehicles = await Vehicle.find({}); // Make sure lastMaintenance is part of the model
    
    return response.status(200).json({
      count: vehicles.length,
      data: vehicles, // vehicles will include lastMaintenance if the schema is correct
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Vehicle from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const vehicle = await Vehicle.findById(id);

    return response.status(200).json(vehicle);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Vehicle
router.put('/:id', async (request, response) => {
  try {
    const { vehicleNo, chassisNo, vehicleType, fuelType, year, driverEmail } = request.body;

    if (!vehicleNo || !chassisNo || !vehicleType || !fuelType || !year || !driverEmail) {
      return response.status(400).send({
        message: 'Send all required fields: vehicleNo, chassisNo, vehicleType, fuelType, year, driverEmail',
      });
    }

    const { id } = request.params;

    const updatedVehicle = {
      vehicleNo,
      chassisNo,
      vehicleType,
      fuelType,
      year,
      driverEmail, // Ensure driverEmail is part of the update
    };

    const result = await Vehicle.findByIdAndUpdate(id, updatedVehicle, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Vehicle not found' });
    }

    return response.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Delete a Vehicle
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Vehicle.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Vehicle not found' });
    }

    return response.status(200).send({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
