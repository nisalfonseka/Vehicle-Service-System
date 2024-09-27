import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShiftScheduler = () => {
    const [dayShiftEmployees, setDayShiftEmployees] = useState([]);
    const [nightShiftEmployees, setNightShiftEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedShift, setSelectedShift] = useState('Day');
    const [employeeInput, setEmployeeInput] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

    const fetchEmployees = async () => {
        try {
            const dayRes = await axios.get('http://localhost:5555/Shift/team?shift=Day');
            console.log("Day Shift Employees:", dayRes.data);
            setDayShiftEmployees(dayRes.data);
        } catch (error) {
            console.error("Error fetching day shift employees:", error);
            setErrorMessage("Failed to fetch day shift employees.");
        }

        try {
            const nightRes = await axios.get('http://localhost:5555/Shift/team?shift=Night');
            console.log("Night Shift Employees:", nightRes.data);
            setNightShiftEmployees(nightRes.data);
        } catch (error) {
            console.error("Error fetching night shift employees:", error);
            setErrorMessage("Failed to fetch night shift employees.");
        }
    };

    const handleAddEmployee = async () => {
        try {
            const inputTrimmed = employeeInput.trim();

            if (!inputTrimmed) {
                setErrorMessage("Please enter an Employee ID or Name.");
                return;
            }

            // Determine if input is ID or Name
            const employeeId = /^\d+$/.test(inputTrimmed) ? inputTrimmed : null;
            const employeeName = !employeeId ? inputTrimmed : null;

            // Prepare data for POST request
            const postData = {
                employeeId: employeeId, // If it's an ID
                Team: employeeName,      // If it's a name
                shift: selectedShift,
            };

            // Send POST request to add employee to the shift
            const response = await axios.post('http://localhost:5555/Shift', postData);
            console.log("Employee added successfully:", response.data);
            setShowModal(false);
            setEmployeeInput('');
            setErrorMessage('');
            fetchEmployees(); // Refresh employee list after adding
        } catch (error) {
            console.error("Error adding employee:", error.response ? error.response.data : error);
            setErrorMessage("Failed to add employee. Please check the input.");
        }
    };

    useEffect(() => {
        fetchEmployees(); 
    }, []);

    const handleDeleteEmployee = async (shiftId) => {
        console.log("Attempting to delete employee with ID:", shiftId); // Log the employee ID
        try {
            const response = await axios.delete(`http://localhost:5555/Shift/${shiftId}`);
            console.log("Employee deleted successfully", response.data);
            fetchEmployees(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting employee:", error);
            setErrorMessage("Error deleting employee.");
        }
    };
    

    const renderRows = (shiftEmployees) => {
        console.log("Rendering Rows for Shift Employees:", shiftEmployees);
        const rows = [];

        for (let i = 0; i < 5; i++) {
            if (i < shiftEmployees.length) {
                rows.push(
                    <tr key={`${shiftEmployees[i]._id}-${i}`}>
                        <td className="font-bold">{shiftEmployees[i].Team} <span className="font-normal">({shiftEmployees[i].role})</span></td>  
                        <td>
                            <button
                               className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-transform transform hover:scale-105"
                               onClick={() => handleDeleteEmployee(shiftEmployees[i]._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            } else {
                rows.push(
                    <tr key={`empty-${i}`}>
                        <td></td>
                        <td></td>
                    </tr>
                );
            }
        }
        return rows;
    };

    return (
        <div className="p-5 font-roboto text-lg text-gray-800 bg-gradient-to-r from-gray-200 to-gray-300">
            <h1 className="text-3xl mb-5 font-bold uppercase border-b-2 border-blue-600 pb-2">Shift Scheduler</h1>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <table className="w-full border-collapse mt-5">
                <thead>
                    <tr>
                        <th className="bg-blue-600 text-white text-lg p-4 border-b-2 border-blue-700">Shift</th>
                        <th className="bg-blue-600 text-white text-lg p-4 border-b-2 border-blue-700">Employee Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4">Day Shift</td>
                        <td>
                            <table>
                                <tbody>
                                    {renderRows(dayShiftEmployees)}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4">Night Shift</td>
                        <td>
                            <table>
                                <tbody>
                                    {renderRows(nightShiftEmployees)}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 mt-5 rounded shadow transition-all duration-300" onClick={() => setShowModal(true)}>
                Add Employee
            </button>

            {showModal && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${showModal ? 'block' : 'hidden'}`}>
                    <div className="bg-white p-12 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl mb-4">Add Employee to {selectedShift} Shift</h2>
                        <input
                            type="text"
                            placeholder="Enter Employee ID or Name"
                            value={employeeInput}
                            onChange={(e) => setEmployeeInput(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                        />

                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                        <div className="flex justify-between mb-4">
                            <button className={`py-2 px-4 ${selectedShift === 'Day' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded`} onClick={() => setSelectedShift('Day')}>
                                Day Shift
                            </button>
                            <button className={`py-2 px-4 ${selectedShift === 'Night' ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded`} onClick={() => setSelectedShift('Night')}>
                                Night Shift
                            </button>
                        </div>

                        <button onClick={handleAddEmployee} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Add Employee</button>
                        <button onClick={() => setShowModal(false)} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ml-2">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShiftScheduler;
