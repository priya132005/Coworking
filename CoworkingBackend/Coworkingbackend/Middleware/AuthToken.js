import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

const AuthToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized", success: false, error: true });

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await UserModel.findById(decoded._id);
    if (!user)
      return res.status(401).json({ message: "Unauthorized", success: false, error: true });

    req.user = user;
    next();
  } catch (err) {
    console.error("AuthToken error:", err);
    res.status(401).json({ message: "Invalid token", success: false, error: true });
  }
};

export default AuthToken;
