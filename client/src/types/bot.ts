export interface Bot {
  _id: string;
  name: string;
  status: "idle" | "working" | "error";
  tasksCompleted: number;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBotFormData {
  name?: string;
}
