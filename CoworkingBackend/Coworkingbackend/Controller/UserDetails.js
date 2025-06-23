import UserModel from '../Models/UserModel.js';

const UserDetailsController = async (req, res) => {
  try {
    if (!req.userID) {
      return res.status(400).json({
        message: "User ID not provided",
        error: true,
        success: false
      });
    }

    const user = await UserModel.findById(req.userID);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    res.status(200).json({
      message: "User details fetched successfully",
      error: false,
      success: true,
      user
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

export default UserDetailsController;
