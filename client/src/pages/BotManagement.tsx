import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { useGetAvailableTasks } from "@/services";
import { BotCreator, BotList } from "@/components/bots";
import { MainLayout } from "@/components/layout";

export const BotManagement: React.FC = () => {
  const { data: availableTasks = [] } = useGetAvailableTasks();

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
            Bot Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Create and manage your bookkeeping bots
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BotCreator />

              <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Available Resources
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box>
                  <Typography variant="body2" gutterBottom>
                    <strong>Available Tasks:</strong> {availableTasks.length}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Task Assignment:</strong> Each bot is assigned 2
                    tasks automatically
                  </Typography>
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
                <Typography variant="h6" gutterBottom>
                  Active Bots
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <BotList />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
};
