import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, useTheme } from "@mui/material";
import { Task } from "@/types";

interface RealTimeTaskProgressProps {
  task: Task;
  forceUpdate?: boolean;
}

export const RealTimeTaskProgress: React.FC<RealTimeTaskProgressProps> = ({
  task,
  forceUpdate,
}) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");
  useEffect(() => {
    if (task.completed || !task.startTime) {
      setProgress(task.completed ? 100 : 0);
      setTimeRemaining(task.completed ? "Completed" : "Not started");
      return;
    }

    const startTime = new Date(task.startTime).getTime();
    const duration = task.duration;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const calculatedProgress = Math.min(
        100,
        Math.floor((elapsed / duration) * 100),
      );

      setProgress(calculatedProgress);

      const remainingTime = Math.max(0, duration - elapsed);

      if (remainingTime <= 0 || calculatedProgress >= 100) {
        setTimeRemaining("Completing...");
      } else {
        const seconds = Math.floor(remainingTime / 1000);
        if (seconds < 60) {
          setTimeRemaining(`${seconds}s`);
        } else {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          setTimeRemaining(`${minutes}m ${remainingSeconds}s`);
        }
      }
    };

    updateProgress();

    const interval = setInterval(updateProgress, 250);

    return () => clearInterval(interval);
  }, [task.completed, task.startTime, task.duration, forceUpdate]);

  const getColor = () => {
    if (task.completed) return "success";
    if (progress < 30) return "warning";
    if (progress < 70) return "info";
    return "success";
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={0.5}
      >
        <Typography
          variant="caption"
          fontWeight="medium"
          color="text.secondary"
        >
          Progress
        </Typography>
        <Typography
          variant="caption"
          fontWeight="medium"
          sx={{
            color: task.completed
              ? theme.palette.success.main
              : theme.palette.text.secondary,
          }}
        >
          {timeRemaining}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={getColor()}
        sx={{ height: 6, borderRadius: 3 }}
      />
      <Typography
        variant="caption"
        display="flex"
        justifyContent="flex-end"
        mt={0.5}
      >
        {progress}%
      </Typography>
    </Box>
  );
};
