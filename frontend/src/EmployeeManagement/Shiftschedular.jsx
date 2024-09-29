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
            setDayShiftEmployees(dayRes.data);
        } catch (error) {
            setErrorMessage("Failed to fetch day shift employees.");
        }

        try {
            const nightRes = await axios.get('http://localhost:5555/Shift/team?shift=Night');
            setNightShiftEmployees(nightRes.data);
        } catch (error) {
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

            const employeeId = /^\d+$/.test(inputTrimmed) ? inputTrimmed : null;
            const employeeName = !employeeId ? inputTrimmed : null;

            const postData = {
                employeeId: employeeId,
                Team: employeeName,
                shift: selectedShift,
            };

            const response = await axios.post('http://localhost:5555/Shift', postData);
            setShowModal(false);
            setEmployeeInput('');
            setErrorMessage('');
            fetchEmployees();
        } catch (error) {
            setErrorMessage("Failed to add employee. Please check the input.");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteEmployee = async (shiftId) => {
        try {
            const response = await axios.delete(`http://localhost:5555/Shift/${shiftId}`);
            fetchEmployees();
        } catch (error) {
            setErrorMessage("Error deleting employee.");
        }
    };

const renderRows = (shiftEmployees) => {
    console.log("Rendering Rows for Shift Employees:", shiftEmployees);
    const rows = [];

    for (let i = 0; i < 5; i++) {
        if (i < shiftEmployees.length) {
            rows.push(
                <tr key={`${shiftEmployees[i]._id}-${i}`} style={{ padding: '5px 0' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>
                        {shiftEmployees[i].Team} <span style={{ fontWeight: 'normal' }}>({shiftEmployees[i].role})</span>
                    </td>
                    <td>
                        <button
                            style={{
                                backgroundColor: '#e53e3e',
                                color: '#fff',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
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
                    <td style={{ padding: '10px' }}></td>
                    <td></td>
                </tr>
            );
        }
    }
    return rows;
};

    return (
        <div style={{ padding: '20px', fontFamily: 'Roboto, sans-serif', fontSize: '18px', color: '#4a5568', background: 'linear-gradient(to right, #edf2f7, #e2e8f0)' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #3182ce', paddingBottom: '10px' }}>Shift Scheduler</h1>
            {errorMessage && <p style={{ color: '#e53e3e' }}>{errorMessage}</p>}

            <div style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px', backgroundColor: '#fff', border: '1px solid #cbd5e0', marginBottom: '30px' }}>
                {/* Day Shift Section */}
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3182ce', borderBottom: '4px solid #2b6cb0', marginBottom: '16px', paddingBottom: '8px' }}>Day Shift</h2>
                    <table style={{ width: '100%', borderSpacing: '0 10px' }}>
                        <tbody>
                            {renderRows(dayShiftEmployees)}
                        </tbody>
                    </table>
                </div>

                {/* Advanced separator between shifts */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                    <hr style={{ border: '2px solid #cbd5e0', width: '100%' }} />
                    <span style={{ backgroundColor: '#fff', padding: '0 10px', fontWeight: 'bold', color: '#a0aec0' }}>Night Shift</span>
                    <hr style={{ border: '2px solid #cbd5e0', width: '100%' }} />
                </div>

                {/* Night Shift Section */}
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3182ce', borderBottom: '4px solid #2b6cb0', marginBottom: '16px', paddingBottom: '8px' }}>Night Shift</h2>
                    <table style={{ width: '100%', borderSpacing: '0 10px' }}>
                        <tbody>
                            {renderRows(nightShiftEmployees)}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                style={{
                    backgroundColor: '#3182ce',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                onClick={() => setShowModal(true)}
            >
                Assign Employee
            </button>

            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            padding: '30px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            width: '400px',
                            textAlign: 'center',
                        }}
                    >
                        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Assign Employee to {selectedShift} Shift</h2>
                        <input
                            type="text"
                            placeholder="Enter Employee Name"
                            value={employeeInput}
                            onChange={(e) => setEmployeeInput(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '16px',
                                border: '1px solid #cbd5e0',
                                borderRadius: '5px',
                                transition: 'border-color 0.3s ease',
                                outline: 'none',
                            }}
                        />

                        {errorMessage && <p style={{ color: '#e53e3e' }}>{errorMessage}</p>}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    backgroundColor: selectedShift === 'Day' ? '#3182ce' : '#e2e8f0',
                                    color: selectedShift === 'Day' ?
                                    '#fff' : '#4a5568',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onClick={() => setSelectedShift('Day')}
                            >
                                Day Shift
                            </button>

                            <button
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    backgroundColor: selectedShift === 'Night' ? '#3182ce' : '#e2e8f0',
                                    color: selectedShift === 'Night' ? '#fff' : '#4a5568',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onClick={() => setSelectedShift('Night')}
                            >
                                Night Shift
                            </button>
                        </div>

                        <button
                            style={{
                                backgroundColor: '#3182ce',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                marginRight: '10px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                            onClick={handleAddEmployee}
                        >
                            Assign Employee
                        </button>
                        <button
                            style={{
                                backgroundColor: '#e53e3e',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShiftScheduler;

