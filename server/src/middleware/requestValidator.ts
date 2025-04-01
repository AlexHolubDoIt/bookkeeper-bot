import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../constants/statusCodes";

export const validateCreateBot = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Bot name is required",
    });
  }

  next();
};

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { description, duration } = req.body;

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Task description is required",
    });
  }

  if (!duration || typeof duration !== "number" || duration <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Task duration must be a positive number",
    });
  }

  next();
};
