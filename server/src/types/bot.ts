import { Types } from "mongoose";

export interface IBot {
  _id: Types.ObjectId;
  name: string;
  status: "idle" | "working" | "error";
  tasksCompleted: number;
  lastActiveAt: Date;
}
