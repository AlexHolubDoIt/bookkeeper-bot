import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  Tabs,
  Tab,
  Alert,
  Chip,
} from "@mui/material";
import { useGetTasks } from "@/services";
import { TaskCreator, TaskList } from "@/components/tasks";
import { MainLayout } from "@/components/layout";

export const TaskAnalytics: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { data: allTasks = [], isLoading, error } = useGetTasks();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getTaskProgress = (task) => {
    if (task.completed) return 100;
    if (!task.startTime) return 0;

    const startTime = new Date(task.startTime).getTime();
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const progressPercent = Math.min(
      100,
      Math.floor((elapsedTime / task.duration) * 100),
    );

    return progressPercent;
  };

  const getTimeRemaining = (task) => {
    if (task.completed) return "Completed";
    if (!task.startTime) return "Not started";

    const startTime = new Date(task.startTime).getTime();
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, task.duration - elapsedTime);

    if (remainingTime <= 0) return "Completing...";

    const seconds = Math.floor(remainingTime / 1000);
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const filteredTasks = React.useMemo(() => {
    switch (tabValue) {
      case 0: // All tasks
        return allTasks;
      case 1: // In progress
        return allTasks.filter((task) => task.status === "in_progress");
      case 2: // Available
        return allTasks.filter((task) => task.status === "available");
      case 3: // Completed
        return allTasks.filter((task) => task.completed);
      default:
        return allTasks;
    }
  }, [allTasks, tabValue]);

  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box my={4}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Task Analytics
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Manage and monitor bookkeeping tasks
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TaskCreator />

              <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Task Statistics
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Total Tasks:</Typography>
                    <Chip
                      label={allTasks.length}
                      size="small"
                      color="primary"
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">In Progress:</Typography>
                    <Chip
                      label={
                        allTasks.filter((t) => t.status === "in_progress")
                          .length
                      }
                      size="small"
                      color="info"
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Available:</Typography>
                    <Chip
                      label={
                        allTasks.filter((t) => t.status === "available").length
                      }
                      size="small"
                      color="warning"
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Completed:</Typography>
                    <Chip
                      label={allTasks.filter((t) => t.completed).length}
                      size="small"
                      color="success"
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  minHeight: "70vh",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="task tabs"
                  >
                    <Tab label={`All Tasks (${allTasks.length})`} />
                    <Tab
                      label={`In Progress (${allTasks.filter((t) => t.status === "in_progress").length})`}
                    />
                    <Tab
                      label={`Available (${allTasks.filter((t) => t.status === "available").length})`}
                    />
                    <Tab
                      label={`Completed (${allTasks.filter((t) => t.completed).length})`}
                    />
                  </Tabs>
                </Box>

                {error ? (
                  <Alert severity="error">
                    Error loading tasks:{" "}
                    {error?.response?.data?.message || "Unknown error"}
                  </Alert>
                ) : (
                  <TaskList
                    tasks={filteredTasks}
                    loading={isLoading}
                    getTaskProgress={getTaskProgress}
                    getTimeRemaining={getTimeRemaining}
                    emptyStateTitle={`No ${tabValue === 0 ? "" : tabValue === 1 ? "in-progress" : tabValue === 2 ? "available" : "completed"} tasks found`}
                    emptyStateDescription="Create tasks to get started"
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
};
