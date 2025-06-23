import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

async function UserSignupController(req, res) {
  try {
    const { email, password, name } = req.body;

    // Check for required fields
    if (!email || !password || !name) {
      throw new Error("Please provide email, password, and name");
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Prepare avatar info if file is uploaded
    let avatar = {};
    if (req.file) {
      const filePath = req.file.path; // e.g., uploads/avatar.jpg
      avatar = {
        public_id: path.basename(filePath), // filename
        secure_url: `${req.protocol}://${req.get('host')}/${filePath.replace(/\\/g, '/')}` // URL
      };
    }

    // Create user payload
    const payload = {
      email,
      name,
      password: hashPassword,
      role: "GENERAL",
      avatar
    };

    // Save user to DB
    const userData = new UserModel(payload);
    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User signed up successfully!",
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}

export default UserSignupController;
