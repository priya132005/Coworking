import User from "../Models/UserModel.js";

const UserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: { _id: user._id, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default UserSignup;
