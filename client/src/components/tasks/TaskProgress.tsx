import React, { useMemo } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Task } from "@/types";

interface TaskProgressProps {
  tasks?: Task[];
  loading?: boolean;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({
  tasks = [],
  loading = false,
}) => {
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const inProgressTasks = tasks.filter(
      (task) => !task.completed && task.status === "in_progress",
    ).length;
    const waitingTasks = tasks.filter(
      (task) => task.status === "available",
    ).length;

    const overallProgress =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      waitingTasks,
      overallProgress,
    };
  }, [tasks]);

  if (loading) {
    return (
      <Box p={2} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const StatCard = ({
    title,
    value,
    color,
  }: {
    title: string;
    value: number;
    color: string;
  }) => (
    <Paper
      elevation={0}
      sx={{
        bgcolor: `${color}.lighter`,
        p: 1.5,
        borderRadius: 2,
        border: 1,
        borderColor: `${color}.light`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        fontWeight="bold"
        color={`${color}.dark`}
      >
        {value}
      </Typography>
      <Typography variant="body2" color={`${color}.dark`}>
        {title}
      </Typography>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Task Progress
      </Typography>

      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Overall Progress
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {stats.completedTasks} / {stats.totalTasks}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={stats.overallProgress}
          sx={{ height: 8, borderRadius: 1 }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: "block" }}
        >
          {stats.overallProgress.toFixed(0)}% complete
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" mb={2}>
        Task Status
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StatCard
            title="Completed"
            value={stats.completedTasks}
            color="success"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            title="In Progress"
            value={stats.inProgressTasks}
            color="info"
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            title="Waiting"
            value={stats.waitingTasks}
            color="warning"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
