import express from 'express';
const router = express.Router();

import UserSignupController from '../Controller/UserSignup.js';
import UserSigninController from '../Controller/UserSignin.js';
import UserDetailsController from '../Controller/UserDetails.js';
import UserLogout from '../Controller/UserLogout.js';
import updateUserRole from '../Controller/updateUserRole.js';
import getAllUsers from '../Controller/allUser.js';
import { AuthToken } from '../Middleware/AuthToken.js';
import { isAdmin } from '../Middleware/isAdmin.js';

import upload from '../Middleware/multer.js';
import { forgotPassword, resetPassword } from '../Controller/forgetPassword.js';

import {
  callHandler,
  chatHandler,
  videoCallHandler,
  messageHandler,
  getAllMessages,
  markMessageAsRead,
} from '../Controller/ContactController.js';

import {
  getAllSpaces,
  getAllSpacesAdmin,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace,
} from '../Controller/SpaceController.js';

import {
  createBooking,
  checkAvailability,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} from '../Controller/BookingController.js';

import { payForBooking } from '../Controller/PaymentController.js';
import { getDashboardStats } from '../Controller/DashboardController.js';

// ---------------------------------------------------------------------------
// Auth routes
// ---------------------------------------------------------------------------
router.post('/signup', upload.single('avatar'), UserSignupController);
router.post('/signin', UserSigninController);
router.get('/user-details', AuthToken, UserDetailsController);
router.post('/logout', UserLogout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

// ---------------------------------------------------------------------------
// User management (admin only)
// ---------------------------------------------------------------------------
router.post('/update-user', AuthToken, isAdmin, updateUserRole);
router.get('/all-users', AuthToken, isAdmin, getAllUsers);

// ---------------------------------------------------------------------------
// Contact routes
// ---------------------------------------------------------------------------
router.post('/call', callHandler);
router.post('/chat', chatHandler);
router.post('/videoCall', videoCallHandler);
router.post('/message', messageHandler);
router.get('/messages', AuthToken, isAdmin, getAllMessages);
router.put('/messages/:id/read', AuthToken, isAdmin, markMessageAsRead);

// ---------------------------------------------------------------------------
// Spaces (coworking listings)
// ---------------------------------------------------------------------------
router.get('/spaces', getAllSpaces);
router.get('/spaces/admin/all', AuthToken, isAdmin, getAllSpacesAdmin);
router.get('/spaces/:id', getSpaceById);
router.post('/spaces', AuthToken, isAdmin, upload.array('images', 5), createSpace);
router.put('/spaces/:id', AuthToken, isAdmin, upload.array('images', 5), updateSpace);
router.delete('/spaces/:id', AuthToken, isAdmin, deleteSpace);

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------
router.get('/bookings/availability', checkAvailability);
router.get('/bookings/my', AuthToken, getMyBookings);
router.get('/bookings', AuthToken, isAdmin, getAllBookings);
router.post('/bookings', AuthToken, createBooking);
router.get('/bookings/:id', AuthToken, getBookingById);
router.put('/bookings/:id/cancel', AuthToken, cancelBooking);
router.put('/bookings/:id/status', AuthToken, isAdmin, updateBookingStatus);

// ---------------------------------------------------------------------------
// Payments (built-in, no external gateway required)
// ---------------------------------------------------------------------------
router.post('/payments/:bookingId/pay', AuthToken, payForBooking);

// ---------------------------------------------------------------------------
// Admin dashboard
// ---------------------------------------------------------------------------
router.get('/admin/stats', AuthToken, isAdmin, getDashboardStats);

export default router;
