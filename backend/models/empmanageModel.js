import mongoose from "mongoose";

const empmanageRequestSchema =  mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    joinedYear: {
      type: Number,
      required: true,
    },
    position:{
      type:String,
      required: true,
    },
    licenseNo:{
      type:Number,
      required: true,
    },
    salary: {
      type:Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const empmanageRequest = mongoose.model("empmanageRequests", empmanageRequestSchema);
