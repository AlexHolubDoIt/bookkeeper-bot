import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socketService from "@/services/socketService";
import {
  BotCreatedEvent,
  TaskCompletedEvent,
  TaskProgressEvent,
  Bot,
  Task,
} from "@/types";
import { botKeys, taskKeys } from "@/services";

/**
 * Custom hook to handle WebSocket events and update the query cache accordingly
 */
export const useSocket = () => {
  const queryClient = useQueryClient();
  const isConnected = useRef(false);

  useEffect(() => {
    if (!isConnected.current) {
      socketService.connect();
      isConnected.current = true;

      const unsubscribeBotCreated = socketService.onBotCreated(
        (data: BotCreatedEvent) => {
          console.log("Socket event: bot:created", data);

          queryClient.setQueryData<Bot[]>(botKeys.all, (oldData = []) => {
            if (oldData.find((bot) => bot._id === data.bot._id)) {
              return oldData;
            }
            return [...oldData, data.bot];
          });

          queryClient.invalidateQueries({ queryKey: taskKeys.available() });

          queryClient.invalidateQueries({ queryKey: taskKeys.all });
        },
      );

      const unsubscribeTaskCompleted = socketService.onTaskCompleted(
        (data: TaskCompletedEvent) => {
          console.log("Socket event: task:completed", data);

          queryClient.setQueryData<Bot[]>(botKeys.all, (oldData = []) => {
            return oldData.map((bot) => {
              if (bot._id === data.botId) {
                return {
                  ...bot,
                  tasksCompleted: bot.tasksCompleted + 1,
                  status: bot.status === "working" ? "idle" : bot.status,
                };
              }
              return bot;
            });
          });

          queryClient.invalidateQueries({
            queryKey: botKeys.detail(data.botId),
          });

          queryClient.invalidateQueries({
            queryKey: botKeys.tasks(data.botId),
          });

          queryClient.setQueryData<Task[]>(taskKeys.all, (oldData = []) => {
            return oldData.map((task) => {
              if (task._id === data.taskId) {
                return {
                  ...task,
                  status: "completed",
                  completed: true,
                  completedAt: new Date().toISOString(),
                };
              }
              return task;
            });
          });
        },
      );

      const unsubscribeTaskProgress = socketService.onTaskProgress(
        (data: TaskProgressEvent) => {
          console.log("Socket event: task:progress", data);
        },
      );

      return () => {
        unsubscribeBotCreated();
        unsubscribeTaskCompleted();
        unsubscribeTaskProgress();
      };
    }

    return () => {};
  }, [queryClient]);

  return socketService;
};
