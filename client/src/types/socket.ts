import { Bot } from "./bot";
import { Task } from "./task";

export interface TaskCompletedEvent {
  botId: string;
  taskId: string;
}

export interface TaskProgressEvent {
  botId: string;
  taskId: string;
  progress: number;
}

export interface BotCreatedEvent {
  bot: Bot;
  tasks: Task[];
}
