import jwt from "jsonwebtoken";
// import userModel from '../Models/UserModel.js';

export const AuthToken = async (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in cookies

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      error: true,
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY); // Verify the token
    req.userID = decoded._id; // Set the user ID in the request object
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    res.status(401).json({
      message: "Invalid token",
      error: true,
      success: false,
    });
  }
};
