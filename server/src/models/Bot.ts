import mongoose, { Schema } from "mongoose";
import { IBotDocument } from "./index";

const BotSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["idle", "working", "error"],
      default: "idle",
    },
    tasksCompleted: {
      type: Number,
      default: 0,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

BotSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "bot",
  options: { sort: { createdAt: -1 } },
});

BotSchema.methods.updateStatus = async function () {
  const bot = this as IBotDocument;
  const tasks = await mongoose
    .model("Task")
    .find({ bot: bot._id, completed: false });

  if (tasks.length > 0) {
    bot.status = "working";
  } else {
    bot.status = "idle";
  }

  bot.lastActiveAt = new Date();
  return bot.save();
};

export default mongoose.model<IBotDocument>("Bot", BotSchema);

export interface ITask {
  _id?: string;
  description: string;
  duration: number;
  startTime?: Date | null;
  completed?: boolean;
  completedAt?: Date | null;
  bot?: string | null;
  status: "available" | "assigned" | "in_progress" | "completed";
}

export interface IBot {
  _id?: string;
  name: string;
  status: "idle" | "working" | "error";
  tasksCompleted: number;
  lastActiveAt: Date;
}

export interface TaskAssignmentResponse {
  bot: IBot;
  assignedTasks: ITask[];
}
