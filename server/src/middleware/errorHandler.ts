import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../constants/statusCodes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", err);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Server Error";

  if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.message;
  }

  if (err.name === "MongoError" && (err as any).code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    message = "Duplicate resource";
  }

  if (err.message.includes("Not enough available tasks")) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
