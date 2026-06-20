import UserModel from '../Models/UserModel.js';

const updateUserRole = async (req, res) => {
  try {
    const { userId, email, name, role } = req.body;
    const payload = { ...(email && { email }), ...(name && { name }), ...(role && { role }) };

    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false, error: true });
    }

    res.status(200).json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || "Server error", success: false, error: true });
  }
};

export default updateUserRole;
