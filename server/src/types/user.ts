import { IBot } from "./bot";
import { ITask } from "./task";

export interface TaskAssignmentResponse {
  bot: IBot;
  assignedTasks: ITask[];
}
