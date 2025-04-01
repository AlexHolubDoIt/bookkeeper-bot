export interface Task {
  _id: string;
  description: string;
  duration: number;
  startTime: string | null;
  completed: boolean;
  completedAt: string | null;
  bot: string | null;
  status: "available" | "assigned" | "in_progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskFormData {
  description?: string;
  duration?: number;
}
