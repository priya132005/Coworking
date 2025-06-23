import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import UserModel from '../Models/UserModel.js';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Email not registered");
    }

    const resetToken = await user.generatePasswordResetToken();
    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>. If the link doesn't work, copy and paste this URL into your browser: ${resetPasswordUrl}`;

    try {
      await sendEmail(email, subject, message);
      res.status(200).json({
        success: true,
        message: `Reset password token has been sent to ${email}`,
        error: false
      });
    } catch (error) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;
      await user.save();

      throw new Error(error.message || "Failed to send email");
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong"
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    if (!password) {
      throw new Error("Password is required");
    }

    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await UserModel.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error("Token is invalid or expired");
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      error: false
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong"
    });
  }
};
