import mongoose, { Schema } from "mongoose";
import { ITaskDocument } from "./index";

const TaskSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    startTime: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    bot: {
      type: Schema.Types.ObjectId,
      ref: "Bot",
      default: null,
    },
    status: {
      type: String,
      enum: ["available", "assigned", "in_progress", "completed"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

TaskSchema.pre("save", function (next) {
  const task = this as ITaskDocument;

  if (task.startTime && !task.completed) {
    const now = new Date();
    const elapsed = now.getTime() - task.startTime.getTime();

    if (elapsed >= task.duration) {
      task.completed = true;
      task.completedAt = now;
      task.status = "completed";
    }
  }

  next();
});

export default mongoose.model<ITaskDocument>("Task", TaskSchema);
