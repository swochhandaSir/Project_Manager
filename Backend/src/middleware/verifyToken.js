import AppError from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    if (!decoded?.id) {
      return next(new AppError("Invalid or expired token", 401));
    }

    req.user = decoded;

    next();

  } catch (err) {

    return next(new AppError("Invalid or expired token", 401));

  }
};