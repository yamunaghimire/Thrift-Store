// authMiddleware.js
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// Middleware to authenticate token
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Middleware for admin-only access
export const adminOnly = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Authorization error", error });
  }
};
