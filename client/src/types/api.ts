import { Bot } from "./bot";
import { Task } from "./task";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}

export interface BotTasksResponse {
  bot: Bot;
  tasks: Task[];
}
