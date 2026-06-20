import UserModel from '../Models/UserModel.js';

const UserDetailsController = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const user = await UserModel.findById(userId);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default UserDetailsController;
