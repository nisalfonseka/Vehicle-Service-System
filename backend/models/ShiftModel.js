import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'empmanageRequests', // Reference to the employee model
    },
    Team: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    shift: {
        type: String,
        enum: ['Day', 'Night'],
        required: true,
    },
}, {
    timestamps: true,
});

export const Shift = mongoose.model("Shift", shiftSchema);
