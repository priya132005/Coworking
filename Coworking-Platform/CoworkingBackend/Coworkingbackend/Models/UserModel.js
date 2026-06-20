import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters'],  // corrected message & length
    select: false, // Do not return password by default in queries
  },
  role: {
    type: String,
    enum: ['GENERAL', 'ADMIN'],
    default: 'GENERAL',
  },
  avatar: {
    public_id: String,
    secure_url: String,
  },

  // Added fields for forgot password
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
}, {
  timestamps: true,
});

// Password hashing middleware before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Methods on the schema
userSchema.methods = {
  // Compare plain password with hashed password
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  // Generate password reset token
  generatePasswordResetToken: function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 mins expiry

    return resetToken;
  },
};

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
