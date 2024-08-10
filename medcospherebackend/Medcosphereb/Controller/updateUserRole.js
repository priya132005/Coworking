import UserModel from '../Models/UserModel.js';

async function updateUserRole(req, res) {
  try {
    const { userId, email, name, role } = req.body;

    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

export default updateUserRole;
