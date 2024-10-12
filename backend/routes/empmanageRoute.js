import express from "express";
import mongoose from "mongoose";
import { empmanageRequest } from "../models/empmanageModel.js";

const router = express.Router();

// Route for Get Total Employee Count
router.get("/total-employee-count", async (req, res) => {
  try {
    const employeeData = await empmanageRequest.aggregate([
      {
        $group: {
          _id: null, // Group by null to count all documents
          totalEmployees: { $sum: 1 }, // Sum to count employees
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          totalEmployees: 1, // Include the totalEmployees field
        },
      },
    ]);

    const totalEmployees = employeeData.length > 0 ? employeeData[0].totalEmployees : 0;

    res.status(200).json({ totalEmployees });
  } catch (error) {
    console.error("Error fetching total employee count:", error);
    res.status(500).send({ message: error.message });
  }
});


// Route for Get Total Salary
router.get("/total-salary", async (req, res) => {
  try {
    const totalSalaryResult = await empmanageRequest.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
    ]);
    res.status(200).json({ totalSalary: totalSalaryResult.length > 0 ? totalSalaryResult[0].totalSalary : 0 });
  } catch (error) {
    console.error("Error fetching total salary:", error);
    res.status(500).send({ message: error.message });
  }
});

/*
// Route to search employee by employeeId or employeeName
router.get("/search", async (req, res) => {
  try {
    const { employeeId, employeeName } = req.query;

    if (!employeeId && !employeeName) {
      return res.status(400).json({ message: "Please provide an employee ID or employee name" });
    }

    let employee;
    if (employeeId) {
      employee = await empmanageRequest.findById(employeeId); // Still using findById as it refers to _id
    } else if (employeeName) {
      employee = await empmanageRequest.findOne({ employeeName });
    }

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Return the employee with employeeId instead of _id
    return res.status(200).json({
      employeeId: employee._id, // Rename _id to employeeId in the response
      employeeName: employee.employeeName,
      
    });
  } catch (error) {
    console.error("Error searching for employee:", error);
    return res.status(500).json({ message: error.message });
  }
});
*/


// Route to search employee by employeeId or employeeName
router.get("/search", async (req, res) => {
  try {
    const { employeeId, employeeName } = req.query;

    // Check if neither employeeId nor employeeName was provided
    if (!employeeId && !employeeName) {
      return res.status(400).json({ message: "Please provide an employee ID or employee name" });
    }

    let employee;
    // Search by employeeId (if provided)
    if (employeeId) {
      employee = await empmanageRequest.findById(employeeId);
    }
    // Search by employeeName (if provided and no result from employeeId)
    if (!employee && employeeName) {
      employee = await empmanageRequest.findOne({ employeeName: { $regex: employeeName, $options: "i" } });
    }

    // If no employee was found
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Send back the employee details
    return res.status(200).json({
      employeeId: employee._id, // Returning _id as employeeId
      employeeName: employee.employeeName,
      email: employee.email,
      contactNo: employee.contactNo,
      Age: employee.Age,
      position: employee.position,
      licenseNo:employee.licenseNo,
      salary: employee.salary,
      joinedYear: employee.joinedYear,
    });
  } catch (error) {
    console.error("Error searching for employee:", error);
    return res.status(500).json({ message: error.message });
  }
});


// Route to get employee recruitment count by year
router.get("/recruitment-per-year", async (req, res) => {
  try {
    const recruitmentData = await empmanageRequest.aggregate([
      {
        $match: {
          joinedYear: { $gte: 2015 } // Filter for years greater than or equal to 2015
        },
      },
      {
        $group: {
          _id: "$joinedYear", // Group by joinedYear
          count: { $sum: 1 }, // Count the number of employees per year
        },
      },
      {
        $sort: { _id: 1 }, // Sort by year in ascending order
      },
    ]);

    res.status(200).json(recruitmentData);
  } catch (error) {
    console.error("Error fetching recruitment data:", error);
    res.status(500).json({ message: "Error fetching recruitment data", error });
  }
});





// Route for Save a new Record
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.employeeName ||
      !request.body.email ||
      !request.body.password ||
      !request.body.contactNo ||
      !request.body.Age ||
      !request.body.joinedYear ||
      !request.body.position ||
      !request.body.licenseNo ||
      !request.body.salary
    ) {
      return response.status(400).send({
        message: "Send all required fields: employeeName, email, password, contactNo, Age, joinedYear,position, licenseNo, salary",
      });
    }

    const newempmanageRequest = {
      employeeName: request.body.employeeName,
      email: request.body.email,
      password: request.body.password,
      contactNo: request.body.contactNo,
      Age: request.body.Age,
      joinedYear: request.body.joinedYear,
      position: request.body.position,
      licenseNo: request.body.licenseNo,
      salary: request.body.salary

    };

    // Rename the variable to avoid conflict
    const createdempmanageRequest = await empmanageRequest.create(newempmanageRequest);

    return response.status(201).send(createdempmanageRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All records from the database
router.get("/", async (request, response) => {
  try {
    const empmanageRequests = await empmanageRequest.find({});

    return response.status(200).json({
      count: empmanageRequests.length,
      data: empmanageRequests,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One record by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const employeeRecord = await empmanageRequest.findById(id);

    if (!employeeRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    return res.status(200).json(employeeRecord);
  } catch (error) {
    console.error("Error fetching employee record:", error);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a record
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.employeeName ||
      !request.body.email ||
      !request.body.password ||
      !request.body.contactNo ||
      !request.body.Age ||
      !request.body.joinedYear ||
      !request.body.position ||
      !request.body.licenseNo||
      !request.body.salary

    ) {
      return response.status(400).send({
        message: "Send all required fields: employeeName,email, password, contactNo, Age, joinedYear, position, licenseNo, salary",
      });
    }

    const { id } = request.params;

    const result = await empmanageRequest.findByIdAndUpdate(id, request.body, { new: true });

    if (!result) {
      return response.status(404).json({ message: "Employee Record not found" });
    }

    return response.status(200).send({ message: "Employee Record updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting an employee record
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await empmanageRequest.findByIdAndDelete(id);

    // Check if the employee record was found and deleted
    if (!result) {
      return response.status(404).json({ Status: false, message: "Employee record not found." });
    }

    // Send a success response if deletion was successful
    return response.status(200).json({ Status: true, message: "Employee record deleted successfully." });
  } catch (error) {
    console.log("Error deleting record:", error.message);
    return response.status(500).json({ Status: false, message: error.message });
  }
});


export default router;