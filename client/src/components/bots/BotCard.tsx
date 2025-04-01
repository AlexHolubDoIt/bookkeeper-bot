import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { Bot } from "@/types";
import { useGetBotTasks, botKeys } from "@/services";
import socketService from "../../services/socketService";
import { useQueryClient } from "@tanstack/react-query";
import { TaskList } from "../tasks";
import { StatusIndicator } from "@/components/common";

interface BotCardProps {
  bot: Bot;
  onDelete: (id: string) => Promise<void>;
}

export const BotCard: React.FC<BotCardProps> = ({ bot, onDelete }) => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading: tasksLoading,
    refetch: refetchTasks,
  } = useGetBotTasks(bot._id);

  useEffect(() => {
    const unsubscribeTaskCompleted = socketService.onTaskCompleted((data) => {
      if (data.botId === bot._id) {
        refetchTasks();

        queryClient.setQueryData(
          botKeys.detail(bot._id),
          (oldData: Bot | undefined) => {
            if (!oldData) return bot;
            return {
              ...oldData,
              tasksCompleted: oldData.tasksCompleted + 1,
              status: "idle",
            };
          },
        );
      }
    });

    return () => {
      unsubscribeTaskCompleted();
    };
  }, [bot._id, refetchTasks, queryClient, bot]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${bot.name}?`)) {
      await onDelete(bot._id);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ mr: 1 }}>
                {bot.name}
              </Typography>
              <StatusIndicator status={bot.status} />
            </Box>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDelete}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {tasksLoading ? (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <TaskList
            tasks={tasks}
            emptyStateTitle="No active tasks"
            emptyStateDescription={
              bot.status === "idle"
                ? "This bot has completed all assigned tasks"
                : "Waiting for task assignment"
            }
          />
        )}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between",
          px: 2,
          py: 1,
          borderTop: "1px solid #eee",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Tasks completed: {bot.tasksCompleted}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last active: {formatDate(bot.lastActiveAt)}
        </Typography>
      </CardActions>
    </Card>
  );
};
