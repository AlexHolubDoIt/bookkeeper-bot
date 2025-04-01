import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Chip } from "@mui/material";
import { Task } from "@/types";
import socketService from "@/services/socketService";
import { RealTimeTaskProgress } from "./RealTimeTaskProgress";

interface TaskCardProps {
  task: Task;
  progress?: number;
  timeRemaining?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const unsubscribe = socketService.onTaskCompleted((data) => {
      if (data.taskId === task._id) {
        setForceUpdate((prev) => !prev);
      }
    });

    return () => unsubscribe();
  }, [task._id]);

  const getStatusColor = () => {
    switch (task.status) {
      case "completed":
        return "success";
      case "in_progress":
        return "info";
      case "assigned":
        return "warning";
      default:
        return "default";
    }
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderLeft: 4,
        borderColor: `${getStatusColor()}.main`,
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={1}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {task.description}
          </Typography>
          <Box display="flex" alignItems="center" mt={0.5} gap={1}>
            <Chip
              label={capitalize(task.status.replace("_", " "))}
              color={getStatusColor()}
              size="small"
              variant="outlined"
            />
            <Typography variant="caption" color="text.secondary">
              Duration: {(task.duration / 1000).toFixed(1)}s
            </Typography>
          </Box>
        </Box>
      </Box>

      <RealTimeTaskProgress
        key={task._id}
        task={task}
        forceUpdate={forceUpdate}
      />
    </Paper>
  );
};
