import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Bot from "../models/Bot";
import Task from "../models/Task";
import botService from "../services/botService";
import { StatusCodes } from "../constants/statusCodes";

export const createBot = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const { name } = req.body;

    const existingBot = await Bot.findOne({ name });
    if (existingBot) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Bot with name ${name} already exists`,
      });
    }

    const { bot, assignedTasks } = await botService.createBotWithTasks(name);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        bot,
        tasks: assignedTasks,
      },
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const getAllBots = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const bots = await Bot.find().sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      count: bots.length,
      data: bots,
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const getBotById = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid bot ID",
      });
    }

    const bot = await Bot.findById(id).populate("tasks");

    if (!bot) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Bot not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: bot,
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const getBotTasks = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid bot ID",
      });
    }

    const tasks = await Task.find({ bot: id }).sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    NextFunction(error);
  }
};

export const deleteBot = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid bot ID",
      });
    }

    const bot = await Bot.findById(id);

    if (!bot) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Bot not found",
      });
    }

    await Task.updateMany(
      { bot: id, completed: false },
      { bot: null, status: "available", startTime: null },
    );

    await Bot.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Bot deleted successfully",
    });
  } catch (error) {
    NextFunction(error);
  }
};
