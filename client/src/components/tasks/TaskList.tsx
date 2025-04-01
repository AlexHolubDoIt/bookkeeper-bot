import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Task } from "@/types";
import { useGetTasks } from "@/services";
import socketService from "../../services/socketService";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "@/components/common";

interface TaskListProps {
  tasks?: Task[];
  loading?: boolean;
  getTaskProgress?: (task: Task) => number;
  getTimeRemaining?: (task: Task) => string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  showCompleted?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks: propTasks,
  loading: propLoading,
  emptyStateTitle = "No tasks available",
  emptyStateDescription,
  showCompleted = true,
}) => {
  const {
    data: fetchedTasks = [],
    isLoading: fetchedLoading,
    refetch,
  } = useGetTasks();

  useEffect(() => {
    const unsubscribeBotCreated = socketService.onBotCreated(() => {
      if (!propTasks) refetch();
    });

    const unsubscribeTaskCompleted = socketService.onTaskCompleted(() => {
      if (!propTasks) refetch();
    });

    return () => {
      unsubscribeBotCreated();
      unsubscribeTaskCompleted();
    };
  }, [propTasks, refetch]);

  const tasks = propTasks || fetchedTasks;
  const loading = propLoading || (propTasks === undefined && fetchedLoading);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  const filteredTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

  if (filteredTasks.length === 0) {
    return (
      <EmptyState
        title={emptyStateTitle}
        description={emptyStateDescription}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        }
      />
    );
  }

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (a.status !== b.status) {
      if (a.status === "in_progress") return -1;
      if (b.status === "in_progress") return 1;
    }

    if (a.startTime && b.startTime) {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    }

    return 0;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {sortedTasks.map((task) => (
        <TaskCard key={`${task._id}`} task={task} />
      ))}
    </Box>
  );
};
