// Controller/forgotPassword.js
import User from "../Models/UserModel.js";
import sendEmail from "../utils/sendEmail.js";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "Email not registered" });

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset Your Password",
      `Click this link to reset password:\n${resetLink}`
    );

    res.json({ success: true, message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default forgotPassword;
