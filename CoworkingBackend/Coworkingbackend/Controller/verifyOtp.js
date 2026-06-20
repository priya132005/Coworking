import crypto from "crypto";
import User from "../Models/UserModel.js";

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    email,
    resetOTP: hashedOtp,
    resetOTPExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  res.json({ success: true, message: "OTP verified" });
};

export default verifyOtp;
