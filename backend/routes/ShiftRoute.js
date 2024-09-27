import express from "express";
import { Shift } from "../models/ShiftModel.js"; 
import { empmanageRequest } from "../models/empmanageModel.js";
import mongoose from "mongoose";

const router = express.Router();

// Route to get employees for a specific shift
router.get("/team", async (req, res) => {
    try {
        const { shift } = req.query;
        if (!shift) {
            return res.status(400).json({ message: "Shift is required" });
        }

        const shiftEmployees = await Shift.find({ shift }).populate('employeeId', 'employeeName');
        return res.status(200).json(shiftEmployees);
    } catch (error) {
        console.error("Error fetching shift employees:", error);
        return res.status(500).json({ message: error.message });
    }
});

// Route to assign an employee to a shift
router.post("/", async (req, res) => {
    try {
        const { employeeId, Team, shift } = req.body; // employeeId or Team (employee name) and shift are required

        if (!shift || (!employeeId && !Team)) {
            return res.status(400).json({ message: "Shift and either Employee ID or Name are required" });
        }

        let employee;

        // If Team (employee name) is provided, find the employee by name
        if (Team) {
            employee = await empmanageRequest.findOne({ employeeName: Team });
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
        } else if (employeeId) { // If employeeId is provided, find the employee by ID
            employee = await empmanageRequest.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
        }

        // Create a new shift entry
        const newShift = new Shift({
            employeeId: employee._id, // Use the employee's ID
            Team: employee.employeeName, // Use employee's name
            role: employee.position,
            shift,
        });

        const savedShift = await newShift.save();
        return res.status(201).json(savedShift);
    } catch (error) {
        console.error("Error assigning shift:", error);
        return res.status(500).json({ message: error.message });
    }
});

// DELETE route to remove an employee from the shift
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        const result = await Shift.findByIdAndDelete(id); // Find and delete the shift

        if (!result) {
            return res.status(404).json({ message: 'Shift not found' });
        }

        res.status(200).json({ message: 'Shift deleted successfully', result });
    } catch (error) {
        console.error("Error deleting shift:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




export default router;
