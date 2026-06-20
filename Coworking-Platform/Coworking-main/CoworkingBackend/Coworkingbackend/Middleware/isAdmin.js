import UserModel from '../Models/UserModel.js';

// Must run AFTER AuthToken middleware (relies on req.userID being set)
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.userID) {
      return res.status(401).json({
        message: 'You must be logged in to access this resource',
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(req.userID);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        message: 'Access denied. Admins only.',
        error: true,
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

export default isAdmin;
