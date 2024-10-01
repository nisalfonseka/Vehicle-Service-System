import React, { useState, useEffect } from "react";
import BackButton from "../BookingManagement/BackButton";
import Spinner from "../BookingManagement/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditBook() {
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const services = [
    { name: "Wash and Grooming", cost: 30, time: 45 },
    { name: "Lube Services", cost: 50, time: 60 },
    { name: "Exterior & Interior Detailing", cost: 80, time: 120 },
    { name: "Engine Tune ups", cost: 150, time: 180 },
    { name: "Undercarriage Degreasing", cost: 40, time: 60 },
    { name: "Windscreen Treatments", cost: 25, time: 30 },
    { name: "Inspection Reports", cost: 75, time: 90 },
    { name: "Insurance Claims", cost: 0, time: 30 },
    { name: "Part Replacements", cost: 100, time: 120 },
    { name: "Hybrid Services", cost: 200, time: 240 },
    { name: "Wheel Alignment", cost: 60, time: 90 },
    { name: "Battery Services", cost: 70, time: 60 },
    { name: "Nano Treatments", cost: 120, time: 180 },
    { name: "Full Paints", cost: 500, time: 480 },
    { name: "Mechanical", cost: 250, time: 300 },
    { name: "Detailing", cost: 100, time: 150 },
    { name: "Body Shop", cost: 400, time: 420 },
    { name: "Periodic Maintenances", cost: 80, time: 120 },
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
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setCustomerName(response.data.customerName);
        setVehicleType(response.data.vehicleType);
        setVehicleNumber(response.data.vehicleNumber);
        setContactNumber(response.data.contactNumber);
        setSelectedServices(response.data.selectedServices);
        setTotalCost(response.data.totalCost);
        setTotalTime(response.data.totalTime);
        setSelectedDate(new Date(response.data.selectedDate));
        setSelectedTimeSlot(response.data.selectedTimeSlot);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please check the console", {
          variant: "error",
        });
        console.log(error);
      }
    };

    fetchBookingDetails();
  }, [id, enqueueSnackbar]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/books?date=${selectedDate.toISOString().split("T")[0]}`
        );
        const bookings = response.data;

        // Initialize availability with 0 bookings for each time slot
        const availability = timeSlots.reduce((acc, slot) => {
          acc[slot] = 0;
          return acc;
        }, {});

        // Count the number of bookings for each time slot
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

  const validateContactNumber = (number) => {
    const numberPattern = /^\+94\d{9}$/;
    return numberPattern.test(number);
  };

  const validateVehicleNumber = (number) => {
    const numberPattern = /^[A-Z]{0,3}[0-9]{0,4}$/;
    return numberPattern.test(number.toUpperCase());
  };

  const handleSaveCustomer = () => {
    if (!customerName.trim()) {
      enqueueSnackbar("Customer name cannot be edited.", { variant: "error" });
      return;
    }

    if (!validateContactNumber(contactNumber)) {
      enqueueSnackbar("Contact number must start with +94 and contain exactly 9 digits.", { variant: "error" });
      return;
    }

    if (!vehicleType.trim()) {
      enqueueSnackbar("Please enter the vehicle type", { variant: "error" });
      return;
    }

    if (!validateVehicleNumber(vehicleNumber)) {
      enqueueSnackbar("Vehicle number must contain 0-3 letters followed by 0-4 digits.", { variant: "error" });
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
      vehicleNumber: vehicleNumber.toUpperCase(), // Ensure vehicle number is uppercase
      selectedServices,
      totalCost,
      totalTime,
      selectedDate: selectedDate.toISOString().split("T")[0],
      selectedTimeSlot,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Booking edited successfully", { variant: "success" });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error while saving the booking.", { variant: "error" });
        console.log(error);
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
      <h1 className="text-3xl my-4">Edit Booking</h1>
      {loading && <Spinner />}
      <div className="flex flex-col rounded-xl w-[1000px] p-4 mx-auto">
        <div className="flex justify-between my-4">
          <div className="w-1/2 pr-2">
            <label className="text-xl font-bold">Customer Name</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              readOnly
              className="w-full p-2 rounded-lg border border-gray-400"
              type="text"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="text-xl font-bold">Contact Number</label>
            <input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-400"
              type="text"
            />
          </div>
        </div>

        <div className="flex justify-between my-4">
        <div className="w-1/2 pr-2">
    <label className="text-xl text-lg font-semibold mr-4 text-black-500">Vehicle Type</label>
    <select
      value={vehicleType}
      onChange={(e) => setVehicleType(e.target.value)}
      className="border-2 border-gray-500 px-4 py-2 w-full"
    >
      <option value="">Select vehicle type</option>
      {[
        "Car",
        "SUV",
        "Vans",
        "Trucks",
        "Motorcycles",
        "Electric Vehicles (EVs)",
        "Hybrid Vehicles",
        "Buses",
        "Recreational Vehicles (RVs)",
      ].map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
  </div>
          <div className="w-1/2 pl-2">
            <label className="text-xl font-bold">Vehicle Number</label>
            <input
              value={vehicleNumber.toUpperCase()}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="w-full p-2 rounded-lg border border-gray-400"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col my-4">
          <label className="text-xl font-bold">Services</label>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.name}>
                <input
                  type="checkbox"
                  id={service.name}
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleCheckboxChange(service)}
                />
                <label htmlFor={service.name} className="ml-2">
                  {service.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="my-4 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-lg font-semibold">Estimated Cost and Time</h4>
          <p className="text-gray-700">Total Cost: LKR: {totalCost}.00</p>
          <p className="text-gray-700">Total Time: {formatTime(totalTime)}</p>
        </div>


        <div className="flex justify-between my-4">
          <div className="w-1/2 pr-2">
            <label className="text-xl font-bold">Selected Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()} // Restrict past dates
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 rounded-lg border border-gray-400"
            />
          </div>
          <div className="my-4">
          <label className="text-lg font-semibold">Select Time Slot </label>
          <select
            value={selectedTimeSlot}
            onChange={(e) => handleTimeSlotChange(e.target.value)}
            className="px-4 py-2 border"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot} 
              </option>
            ))}
          </select>
        </div>
        </div>

        <button
          onClick={handleSaveCustomer}
          className="bg-blue-500 text-white p-3 rounded-lg mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditBook;
