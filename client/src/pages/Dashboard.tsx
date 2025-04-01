import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useGetBots, useGetTasks } from "@/services";
import { MainLayout } from "@/components/layout";
import { BotList, BotStats } from "@/components/bots";
import { TaskProgress } from "@/components/tasks";

export const Dashboard: React.FC = () => {
  const { data: bots = [], error: botsError } = useGetBots();
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
  } = useGetTasks();

  const hasError = botsError || tasksError;

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
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Monitor your bookkeeping bots and tasks
          </Typography>

          {hasError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Error</AlertTitle>
              {botsError && (
                <div>Failed to load bots: {botsError.toString()}</div>
              )}
              {tasksError && (
                <div>Failed to load tasks: {tasksError.toString()}</div>
              )}
            </Alert>
          )}

          <BotStats bots={bots} />

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Paper elevation={0} sx={{ p: 0 }}>
                <BotList />
              </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <TaskProgress tasks={tasks} loading={tasksLoading} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
};
