import UserModel from '../Models/UserModel.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      message: "All users fetched successfully",
      success: true,
      error: false,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

export default getAllUsers;
