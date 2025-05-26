import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../Models/UserModel.js';

async function UserSigninController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Please provide email and password", 
        error: true, 
        success: false 
      });
    }

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        error: true, 
        success: false 
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ 
        message: "Invalid password", 
        error: true, 
        success: false 
      });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '7h',
    });

    const tokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    };

    res.cookie('token', token, tokenOptions);

    res.status(201).json({
      message: "Login successfully",
      data: token,
      success: true,
      error: false,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
}

export default UserSigninController;
