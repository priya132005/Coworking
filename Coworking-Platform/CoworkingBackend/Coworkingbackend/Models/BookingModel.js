import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
      required: true,
    },
    date: {
      // Stored as 'YYYY-MM-DD' for simple, timezone-free comparisons
      type: String,
      required: [true, 'Booking date is required'],
    },
    startTime: {
      // Stored as 'HH:mm' in 24-hour format
      type: String,
      required: [true, 'Start time is required'],
    },
    hours: {
      type: Number,
      required: [true, 'Duration in hours is required'],
      min: [1, 'Minimum booking duration is 1 hour'],
      max: [12, 'Maximum booking duration is 12 hours'],
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    paymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      default: 'mock-gateway',
    },
    paidAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ space: 1, date: 1 });
bookingSchema.index({ user: 1 });

const BookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default BookingModel;
