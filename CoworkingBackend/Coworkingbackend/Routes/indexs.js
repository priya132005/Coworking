import express from 'express';
const router = express.Router();

import UserSignupController from '../Controller/UserSignup.js';
import UserSigninController from '../Controller/UserSignin.js';
import UserDetailsController from '../Controller/UserDetails.js';
import UserLogout from '../Controller/UserLogout.js';
import updateUserRole from '../Controller/updateUserRole.js';
import getAllUsers from '../Controller/allUser.js';
import { AuthToken } from '../Middleware/AuthToken.js';

import upload from '../Middleware/multer.js';
import { forgotPassword, resetPassword } from '../Controller/forgetPassword.js';

import {
  callHandler,
  chatHandler,
  videoCallHandler,
  messageHandler
} from '../Controller/ContactController.js';

// ✅ Auth routes
router.post('/signup', upload.single('avatar'), UserSignupController);
router.post('/signin', UserSigninController);
router.get('/user-details', AuthToken, UserDetailsController);
router.post('/logout', UserLogout);
router.post('/update-user', AuthToken, updateUserRole);
router.get('/all-users', AuthToken, getAllUsers);

// ✅ Contact routes (FIXED ❌ removed /api)
router.post('/call', callHandler);
router.post('/chat', chatHandler);
router.post('/videoCall', videoCallHandler);
router.post('/message', messageHandler);

// ✅ Password reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

export default router;
