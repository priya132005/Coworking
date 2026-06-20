import crypto from 'crypto';
import BookingModel from '../Models/BookingModel.js';

// @route   POST /api/payments/:bookingId/pay  (auth required - owner only)
// @desc    Built-in payment processor. No external gateway keys required.
//          Simulates a successful charge and immediately confirms the booking.
//          Card details are accepted but not stored anywhere — only the
//          last 4 digits are echoed back for the receipt.
export const payForBooking = async (req, res) => {
  try {
    const { cardName, cardNumber } = req.body;
    const booking = await BookingModel.findById(req.params.bookingId).populate(
      'space',
      'name city address'
    );

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
        error: true,
        success: false,
      });
    }

    if (booking.user.toString() !== req.userID.toString()) {
      return res.status(403).json({
        message: 'You are not authorized to pay for this booking',
        error: true,
        success: false,
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        message: 'This booking has been cancelled and cannot be paid for',
        error: true,
        success: false,
      });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({
        message: 'This booking has already been paid for',
        error: true,
        success: false,
      });
    }

    // Basic, non-blocking validation just to mimic a real checkout form.
    // We never persist full card details.
    const last4 = cardNumber ? String(cardNumber).replace(/\s/g, '').slice(-4) : '0000';

    const paymentId = `PAY-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    booking.paymentId = paymentId;
    booking.paidAt = new Date();
    booking.paymentMethod = 'mock-gateway';
    await booking.save();

    res.status(200).json({
      message: 'Payment successful! Your booking is confirmed.',
      data: {
        booking,
        receipt: {
          paymentId,
          amount: booking.totalAmount,
          cardHolder: cardName || 'N/A',
          cardLast4: last4,
          paidAt: booking.paidAt,
        },
      },
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};
