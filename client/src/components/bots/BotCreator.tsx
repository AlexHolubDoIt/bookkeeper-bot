import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Alert,
  Box,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createBotSchema, CreateBotFormData } from "@/validation";
import { useCreateBot, useGetAvailableTasks } from "@/services";
import socketService from "../../services/socketService";

export const BotCreator: React.FC = () => {
  const { data: availableTasks = [], isLoading: tasksLoading } =
    useGetAvailableTasks();
  const createBotMutation = useCreateBot();
  const [successMessage, setSuccessMessage] = useState("");
  const [socketCreated, setSocketCreated] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBotFormData>({
    resolver: zodResolver(createBotSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const unsubscribe = socketService.onBotCreated((data) => {
      if (socketCreated) {
        setSuccessMessage(
          `Bot "${data.bot.name}" was created and assigned ${data.tasks.length} tasks!`,
        );
        setSocketCreated(false);
      }
    });

    return () => unsubscribe();
  }, [socketCreated]);

  const onSubmit = async (data: CreateBotFormData) => {
    try {
      await createBotMutation.mutateAsync(data);
      setSocketCreated(true);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  const notEnoughTasks = availableTasks.length < 2;

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Create New Bot" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Bot Name"
              placeholder="e.g. BookkeeperBot"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isSubmitting || notEnoughTasks}
            />

            <Box mt={2}>
              {notEnoughTasks ? (
                <Alert severity="warning">
                  Not enough available tasks. Add more tasks to create bots.
                </Alert>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {availableTasks.length} tasks available for assignment
                </Typography>
              )}
            </Box>

            {createBotMutation.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {createBotMutation.error?.response?.data?.message ||
                  "An error occurred while creating the bot"}
              </Alert>
            )}

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || tasksLoading || notEnoughTasks}
                color="primary"
              >
                {isSubmitting ? "Creating..." : "Create Bot"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};
