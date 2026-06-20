import UserModel from '../Models/UserModel.js';
import path from 'path';

async function UserSignupController(req, res) {
  try {
    // ✅ Works for BOTH JSON and multipart/form-data
    const email = req.body?.email;
    const password = req.body?.password;
    const name = req.body?.name;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Please provide email, password, and name",
        success: false,
        error: true,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    // ✅ Avatar optional (feature preserved)
    let avatar = {};
    if (req.file) {
      const filePath = req.file.path;
      avatar = {
        public_id: path.basename(filePath),
        secure_url: `${req.protocol}://${req.get('host')}/${filePath.replace(/\\/g, '/')}`,
      };
    }

    const user = await UserModel.create({
      email,
      name,
      password,   // hashing still done by schema
      role: "GENERAL",
      avatar,
    });

    res.status(201).json({
      data: user,
      success: true,
      error: false,
      message: "User signed up successfully!",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}

export default UserSignupController;
