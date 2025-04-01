import { Types } from "mongoose";

export interface ITask {
  _id: Types.ObjectId;
  description: string;
  duration: number;
  startTime?: Date | null;
  completed?: boolean;
  completedAt?: Date | null;
  bot?: string | null;
  status: "available" | "assigned" | "in_progress" | "completed";
}
