import UserModel from '../Models/UserModel.js'; // Ensure correct import path

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      message: "All users fetched successfully",
      error: false,
      success: true,
      data: users // Ensure that the data is being sent properly
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

export default getAllUsers;
