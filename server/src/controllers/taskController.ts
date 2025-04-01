import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import { StatusCodes } from "../constants/statusCodes";

export const getAllTasks = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const getAvailableTasks = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const tasks = await Task.find({ bot: null, status: "available" });

    return res.status(StatusCodes.OK).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const { description, duration } = req.body;

    const task = await Task.create({
      description,
      duration,
      status: "available",
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: task,
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: task,
    });
  } catch (error) {
    NextFunction(error);
  }
};
