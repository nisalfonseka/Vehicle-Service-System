import express from 'express';
import { Profile } from '../models/profileModel.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join('uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  },
});

// Create a new Admin Profile (POST method)
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, role, password, phone } = req.body;

    const newProfile = new Profile({
      name,
      email,
      role,
      password, // Store password directly
      phone,
      avatar: req.file ? req.file.path : '',
    });

    await newProfile.save();

    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
});

// Get Admin Profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

// Update Admin Profile (PUT method)
router.put('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, role, password, phone } = req.body;

    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // Update profile fields
    profile.name = name || profile.name;
    profile.email = email || profile.email;
    profile.role = role || profile.role;
    profile.phone = phone || profile.phone;
    profile.password = password || profile.password;

    // Handle avatar file
    if (req.file) {
      profile.avatar = req.file.path;
    }

    // Update password if provided
    if (password) {
      profile.password = password; // Store password directly
    }

    await profile.save();

    res.json({
      message: 'Profile updated successfully',
      profile: {
        ...profile.toObject(),
        avatar: profile.avatar ? `/uploads/${path.basename(profile.avatar)}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

export default router;
