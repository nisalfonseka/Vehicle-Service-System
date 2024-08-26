import React, { useState, useEffect } from "react";
import BackButton from "../BookingManagement/BackButton";
import Spinner from "../BookingManagement/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [timeSlotsAvailability, setTimeSlotsAvailability] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const services = [
    { name: "Wash and Grooming", cost: 9000, time: 45 },
    { name: "Lube Services", cost: 5000, time: 60 },
    { name: "Exterior & Interior Detailing", cost: 8000, time: 120 },
    { name: "Engine Tune ups", cost: 15000, time: 180 },
    { name: "Undercarriage Degreasing", cost: 40000, time: 60 },
    { name: "Windscreen Treatments", cost: 20000, time: 60 },
    { name: "Inspection Reports", cost: 7500, time: 90 },
    { name: "Insurance Claims", cost: 0, time: 30 },
    { name: "Part Replacements", cost: 10000, time: 100 },
    { name: "Hybrid Services", cost: 200000, time: 140 },
    { name: "Wheel Alignment", cost: 6000, time: 90 },
    { name: "Battery Services", cost: 7000, time: 60 },
    { name: "Nano Treatments", cost: 12000, time: 180 },
    { name: "Full Paints", cost: 20000, time: 1440 },
    { name: "Mechanical", cost: 15000, time: 300 },
    { name: "Detailing", cost: 10000, time: 150 },
    { name: "Body Shop", cost: 9000, time: 60 },
    { name: "Periodic Maintenances", cost: 20000, time: 120 },

    { name: "Other", cost: 0, time: 0 },
  ];

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books?date=${selectedDate.toISOString().split("T")[0]}`);
        const bookings = response.data;

        const availability = timeSlots.reduce((acc, slot) => {
          acc[slot] = 0;
          return acc;
        }, {});

        bookings.forEach((booking) => {
          if (availability[booking.selectedTimeSlot] !== undefined) {
            availability[booking.selectedTimeSlot]++;
          }
        });

        setTimeSlotsAvailability(availability);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [selectedDate]);

  const handleCheckboxChange = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service.name)
        ? prevSelected.filter((s) => s !== service.name)
        : [...prevSelected, service.name]
    );
    calculateTotalCostAndTime(service, !selectedServices.includes(service.name));
  };

  const calculateTotalCostAndTime = (service, isSelected) => {
    setTotalCost((prevCost) => prevCost + (isSelected ? service.cost : -service.cost));
    setTotalTime((prevTime) => prevTime + (isSelected ? service.time : -service.time));
  };

  const handleSaveCustomer = () => {
    if (!customerName.trim()) {
      enqueueSnackbar("Please enter the customer's name", { variant: "error" });
      return;
    }

    if (!contactNumber.trim()) {
      enqueueSnackbar("Please enter the contact number", { variant: "error" });
      return;
    }

    if (!vehicleType.trim()) {
      enqueueSnackbar("Please enter the vehicle type", { variant: "error" });
      return;
    }

    if (!vehicleNumber.trim()) {
      enqueueSnackbar("Please enter the vehicle number", { variant: "error" });
      return;
    }

    if (selectedServices.length === 0) {
      enqueueSnackbar("Please select at least one service", { variant: "error" });
      return;
    }

    if (!selectedTimeSlot) {
      enqueueSnackbar("Please select a time slot", { variant: "error" });
      return;
    }

    const data = {
      customerName,
      contactNumber,
      vehicleType,
      vehicleNumber,
      selectedServices,
      totalCost,
      totalTime,
      selectedDate: selectedDate.toISOString().split("T")[0],
      selectedTimeSlot,
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Customer Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error occurred while creating the customer", { variant: "error" });
        console.error(error);
      });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"></h1>
      {loading && <Spinner />}
      <div className="flex flex-col rounded-xl w-[1000px] p-4 mx-auto">
        <div className="flex justify-between my-4">
          <div className="w-1/2 pr-2">
            <label className="text-xl text-lg font-semibold mr-4 text-black-500">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border-2 rem border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="text-xl text-lg font-semibold mr-4 text-black-500">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="border-2 rem border-gray-500 px-4 py-2 w-full"
            />
          </div>
        </div>

        <div className="flex justify-between my-4">
          <div className="w-1/2 pr-2">
            <label className="text-xl text-lg font-semibold mr-4 text-black-500">Vehicle Type</label>
            <input
              type="text"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="text-xl text-lg font-semibold mr-4 text-black-500">Vehicle Number</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Service Selection */}
        <div className="my-4">
          <h4 className="text-xl text-lg font-semibold text-black-500">Select Services</h4>
          <div className="service-grid grid grid-cols-3 gap-4 mt-2">
            {services.map((service, index) => (
              <label key={index} className="service-option flex items-center">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleCheckboxChange(service)}
                  className="mr-2"
                />
                {service.name}
              </label>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex justify-between my-4">
          <div className="my-4">
            <label className="text-xl text-lg font-semibold mr-4 text-black-500">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()} // Restrict to current day and future dates
            />
          </div>

          {/* Time Slot Selection */}
          <div className="my-4">
            <label className="text-xl text-lg font-semibold mr-4 text-black-500">Select Time Slot</label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            >
              <option value="" disabled>
                Select a time slot
              </option>
              {timeSlots.map((slot, index) => (
                <option
                  key={index}
                  value={slot}
                  disabled={timeSlotsAvailability[slot] >= 3} // Disable slot if fully booked
                >
                  {slot} {timeSlotsAvailability[slot] >= 3 ? "(Fully Booked)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Estimation Summary */}
        <div className="my-4 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-lg font-semibold">Estimated Cost and Time</h4>
          <p className="text-gray-700">Total Cost: LKR: {totalCost}.00</p>
          <p className="text-gray-700">Total Time: {formatTime(totalTime)}</p>
        </div>

        <button className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md lg:inline-flex hover:bg-red-700 focus:bg-red-700" onClick={handleSaveCustomer}>
          Add Booking
        </button>
      </div>
    </div>
  );
}

export default CreateCustomer;
