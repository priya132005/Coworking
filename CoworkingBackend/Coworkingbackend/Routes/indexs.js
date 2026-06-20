import express from "express";
const router = express.Router();

// Controllers
import UserSignup from "../Controller/UserSignup.js";
import UserSignin from "../Controller/UserSignin.js";
import UserLogout from "../Controller/UserLogout.js";
import forgotPassword from "../Controller/forgotPassword.js";
import resetPassword from "../Controller/resetPassword.js";
import verifyOtp from "../Controller/verifyOtp.js";
// Users
import allUser from "../Controller/getAllUsers.js";
import UserDetails from "../Controller/UserDetails.js";
import updateUserRole from "../Controller/updateUserRole.js";

// Middleware
import AuthToken from "../Middleware/AuthToken.js";

// Auth routes
router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.post("/logout", UserLogout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/verify-otp", verifyOtp);
// Protected routes
router.get("/users", AuthToken, allUser);
router.get("/user-details", AuthToken, UserDetails);
router.put("/update-role", AuthToken, updateUserRole);

export default router;
