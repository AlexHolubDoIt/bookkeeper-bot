import { Document, ObjectId } from "mongoose";

export interface ITask {
  description: string;
  duration: number;
  startTime?: Date | null;
  completed?: boolean;
  completedAt?: Date | null;
  bot?: string | ObjectId | null;
  status: "available" | "assigned" | "in_progress" | "completed";
}

export interface IBot {
  name: string;
  status: "idle" | "working" | "error";
  tasksCompleted: number;
  lastActiveAt: Date;
}

export interface ITaskDocument extends ITask, Document {}

export interface IBotDocument extends IBot, Document {
  updateStatus(): Promise<IBotDocument>;
}

export interface TaskAssignmentResponse {
  bot: IBot;
  assignedTasks: ITask[];
}
