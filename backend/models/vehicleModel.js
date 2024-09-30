import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  chassisNo: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  lastMaintenance: {
    type: String, // or Date if you're storing it as a date
    required: true,
  },
  driverEmail: {
    type: String, // Add driverEmail to schema
    required: true,
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export { Vehicle };
