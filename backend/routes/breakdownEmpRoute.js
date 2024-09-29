import express from 'express';
import { empmanageRequest } from '../models/empmanageModel.js'; // Import the employee model

const router = express.Router();

// Route to fetch all employee details
router.get('/employees', async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await empmanageRequest.find({});
    
    // Check if employees exist
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    // Send employees data as the response
    res.status(200).json(employees);
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ message: 'Error fetching employee details', error: error.message });
  }
});

export default router;