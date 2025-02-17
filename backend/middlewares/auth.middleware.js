import { CustomError } from "../core/errors.js";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import DB from "../db/index.js";

const authMiddleware = (req, res, next) => {
  try {
    // Allow public access to static files under /app/*
    if (req.path.startsWith("/app") || req.path.startsWith("/hello")) {
      return next(); // Skip authentication for React files
    }
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = DB.getUserById(decoded.userId);

    if (!user) {
      throw new CustomError("Unauthorized", 401);
    }
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authMiddleware;
