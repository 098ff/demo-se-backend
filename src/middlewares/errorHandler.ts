import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/customError.js";

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Handle MongoDB Duplicate Key errors (code 11000)
  if (typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value entered",
    });
  }

  console.error("[Unhandled Error]:", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
