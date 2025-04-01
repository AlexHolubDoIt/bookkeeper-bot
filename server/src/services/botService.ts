import Bot from "../models/Bot";
import Task from "../models/Task";
import { TaskAssignmentResponse } from "../types";
import socketService from "./socketService";

class BotService {
  /**
   * Create a new bot and assign 2 tasks without using transactions
   */
  async createBotWithTasks(name: string): Promise<TaskAssignmentResponse> {
    try {
      const newBot = await Bot.create({ name });

      const availableTasks = await Task.find(
        { bot: null, status: "available" },
        null,
        { limit: 2 },
      );

      if (availableTasks.length < 2) {
        await Bot.findByIdAndDelete(newBot._id);
        throw new Error("Not enough available tasks to assign");
      }

      const now = new Date();
      const assignedTasks = [];

      for (const task of availableTasks) {
        task.bot = newBot._id;
        task.status = "in_progress";
        task.startTime = now;
        await task.save();
        assignedTasks.push(task);
      }

      newBot.status = "working";
      await newBot.save();

      socketService.emitBotCreated({
        bot: newBot.toObject(),
        tasks: assignedTasks.map((t) => t.toObject()),
      });

      return {
        bot: newBot.toObject(),
        assignedTasks: assignedTasks.map((t) => t.toObject()),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check for completed tasks and update bot status
   */
  async checkTasksCompletion() {
    try {
      const botsWithTasks = await Bot.find({ status: "working" });

      for (const bot of botsWithTasks) {
        const tasks = await Task.find({ bot: bot._id, completed: false });

        for (const task of tasks) {
          if (task.startTime) {
            const now = new Date();
            const elapsed = now.getTime() - task.startTime.getTime();

            if (elapsed >= task.duration && !task.completed) {
              task.completed = true;
              task.completedAt = now;
              task.status = "completed";
              await task.save();

              bot.tasksCompleted += 1;

              socketService.emitTaskCompleted({
                botId: bot._id.toString(),
                taskId: task._id.toString(),
              });
            }
          }
        }

        await bot.updateStatus();
      }
    } catch (error) {
      console.error("Error in task completion check:", error);
    }
  }
}

export default new BotService();
