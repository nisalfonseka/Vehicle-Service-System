import mongoose from 'mongoose';


const profileSchema = mongoose.Schema(
  {
    name: {
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
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'HR Manager',
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);



export const Profile = mongoose.model('Profile', profileSchema);
