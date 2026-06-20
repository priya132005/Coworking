import UserModel from '../Models/UserModel.js';
import SpaceModel from '../Models/SpaceModel.js';
import BookingModel from '../Models/BookingModel.js';

// @route   GET /api/admin/stats  (admin only)
export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalSpaces, totalBookings, paidBookings, recentBookings] = await Promise.all([
      UserModel.countDocuments(),
      SpaceModel.countDocuments(),
      BookingModel.countDocuments(),
      BookingModel.find({ paymentStatus: 'paid' }),
      BookingModel.find()
        .populate('space', 'name city')
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const totalRevenue = paidBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const pendingBookings = await BookingModel.countDocuments({ status: 'pending' });
    const confirmedBookings = await BookingModel.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await BookingModel.countDocuments({ status: 'cancelled' });

    res.status(200).json({
      message: 'Dashboard stats fetched successfully',
      data: {
        totalUsers,
        totalSpaces,
        totalBookings,
        totalRevenue,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        recentBookings,
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
