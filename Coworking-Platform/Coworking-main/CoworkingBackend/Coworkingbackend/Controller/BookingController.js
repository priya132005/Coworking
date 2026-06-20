import BookingModel from '../Models/BookingModel.js';
import SpaceModel from '../Models/SpaceModel.js';
import UserModel from '../Models/UserModel.js';

const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

// Returns true if the two [start, start+duration] ranges overlap
const rangesOverlap = (startA, durationAHours, startB, durationBHours) => {
  const startAMin = timeToMinutes(startA);
  const endAMin = startAMin + durationAHours * 60;
  const startBMin = timeToMinutes(startB);
  const endBMin = startBMin + durationBHours * 60;
  return startAMin < endBMin && startBMin < endAMin;
};

const isSlotAvailable = async (spaceId, date, startTime, hours, excludeBookingId = null) => {
  const filter = {
    space: spaceId,
    date,
    status: { $ne: 'cancelled' },
  };
  if (excludeBookingId) filter._id = { $ne: excludeBookingId };

  const existingBookings = await BookingModel.find(filter);

  return !existingBookings.some((booking) =>
    rangesOverlap(startTime, hours, booking.startTime, booking.hours)
  );
};

// @route   POST /api/bookings  (auth required)
export const createBooking = async (req, res) => {
  try {
    const { spaceId, date, startTime, hours } = req.body;

    if (!spaceId || !date || !startTime || !hours) {
      return res.status(400).json({
        message: 'Please provide spaceId, date, startTime and hours',
        error: true,
        success: false,
      });
    }

    const numericHours = Number(hours);
    if (!Number.isFinite(numericHours) || numericHours < 1 || numericHours > 12) {
      return res.status(400).json({
        message: 'Hours must be a number between 1 and 12',
        error: true,
        success: false,
      });
    }

    const requestedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(requestedDate.getTime()) || requestedDate < today) {
      return res.status(400).json({
        message: 'Please choose a valid, upcoming date',
        error: true,
        success: false,
      });
    }

    const space = await SpaceModel.findById(spaceId);
    if (!space || !space.isActive) {
      return res.status(404).json({
        message: 'Space not found or unavailable',
        error: true,
        success: false,
      });
    }

    const available = await isSlotAvailable(spaceId, date, startTime, numericHours);
    if (!available) {
      return res.status(409).json({
        message: 'This space is already booked for the selected time slot. Please choose a different time.',
        error: true,
        success: false,
      });
    }

    const totalAmount = Number((space.pricePerHour * numericHours).toFixed(2));

    const booking = await BookingModel.create({
      user: req.userID,
      space: spaceId,
      date,
      startTime,
      hours: numericHours,
      pricePerHour: space.pricePerHour,
      totalAmount,
      status: 'pending',
      paymentStatus: 'unpaid',
    });

    const populatedBooking = await BookingModel.findById(booking._id).populate(
      'space',
      'name city address images pricePerHour category'
    );

    res.status(201).json({
      message: 'Booking created successfully. Please proceed to payment.',
      data: populatedBooking,
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

// @route   GET /api/bookings/availability?spaceId=&date=&startTime=&hours=
export const checkAvailability = async (req, res) => {
  try {
    const { spaceId, date, startTime, hours } = req.query;

    if (!spaceId || !date || !startTime || !hours) {
      return res.status(400).json({
        message: 'Please provide spaceId, date, startTime and hours',
        error: true,
        success: false,
      });
    }

    const available = await isSlotAvailable(spaceId, date, startTime, Number(hours));

    res.status(200).json({
      message: available ? 'Slot is available' : 'Slot is not available',
      data: { available },
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

// @route   GET /api/bookings/my  (auth required)
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.userID })
      .populate('space', 'name city address images pricePerHour category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Bookings fetched successfully',
      data: bookings,
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

// @route   GET /api/bookings/:id  (auth required - owner or admin)
export const getBookingById = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate('space', 'name city address images pricePerHour category capacity')
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
        error: true,
        success: false,
      });
    }

    const isOwner = booking.user._id.toString() === req.userID.toString();
    let requestingUserIsAdmin = false;
    if (!isOwner) {
      const requestingUser = await UserModel.findById(req.userID);
      requestingUserIsAdmin = requestingUser && requestingUser.role === 'ADMIN';
    }

    if (!isOwner && !requestingUserIsAdmin) {
      return res.status(403).json({
        message: 'You are not authorized to view this booking',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: 'Booking fetched successfully',
      data: booking,
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

// @route   PUT /api/bookings/:id/cancel  (auth required - owner only)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
        error: true,
        success: false,
      });
    }

    if (booking.user.toString() !== req.userID.toString()) {
      return res.status(403).json({
        message: 'You are not authorized to cancel this booking',
        error: true,
        success: false,
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        message: 'Booking is already cancelled',
        error: true,
        success: false,
      });
    }

    booking.status = 'cancelled';
    if (booking.paymentStatus === 'paid') {
      booking.paymentStatus = 'refunded';
    }
    await booking.save();

    res.status(200).json({
      message: 'Booking cancelled successfully',
      data: booking,
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

// @route   GET /api/bookings  (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const { status, paymentStatus, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    let bookings = await BookingModel.find(filter)
      .populate('space', 'name city category')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    if (search) {
      const lowerSearch = search.toLowerCase();
      bookings = bookings.filter(
        (b) =>
          b.user?.name?.toLowerCase().includes(lowerSearch) ||
          b.user?.email?.toLowerCase().includes(lowerSearch) ||
          b.space?.name?.toLowerCase().includes(lowerSearch)
      );
    }

    res.status(200).json({
      message: 'Bookings fetched successfully',
      data: bookings,
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

// @route   PUT /api/bookings/:id/status  (admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
        error: true,
        success: false,
      });
    }

    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
        error: true,
        success: false,
      });
    }

    booking.status = status;
    if (status === 'cancelled' && booking.paymentStatus === 'paid') {
      booking.paymentStatus = 'refunded';
    }
    await booking.save();

    res.status(200).json({
      message: 'Booking status updated successfully',
      data: booking,
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
