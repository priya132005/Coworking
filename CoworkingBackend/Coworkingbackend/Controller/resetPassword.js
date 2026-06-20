// Controller/resetPassword.js
import crypto from "crypto";
import User from "../Models/UserModel.js";

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ success: false, message: "Token expired or invalid" });

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.json({ success: true, message: "Password reset successful" });
};

export default resetPassword;
