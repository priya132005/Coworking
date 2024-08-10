import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';

async function UserSignupController(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    if (!email || !password || !name) {
      throw new Error("Please provide email, password, and name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      email,
      name,
      password: hashPassword,
      role: "GENERAL"
    };

    const userData = new UserModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Signup Successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default UserSignupController;
