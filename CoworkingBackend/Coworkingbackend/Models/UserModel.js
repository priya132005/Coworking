// Models/UserModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  role: {
    type: String,
    enum: ["GENERAL", "ADMIN"],
    default: "GENERAL",
  },

  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
});

/* Hash password */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* Generate reset token */
userSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

  return token;
};

export default mongoose.model("User", userSchema);
