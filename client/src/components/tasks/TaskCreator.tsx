import React from "react";
import { useForm, Controller } from "react-hook-form";
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
} from "@mui/material";
import { createTaskSchema, CreateTaskFormData } from "@/validation/schemas";
import { useCreateTask } from "@/services";
import { AxiosError } from "axios";

export const TaskCreator: React.FC = () => {
  const createTaskMutation = useCreateTask();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      description: "",
      duration: 1000,
    },
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await createTaskMutation.mutateAsync(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Create New Task" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Task Description"
            placeholder="e.g. process invoice"
            fullWidth
            margin="normal"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isSubmitting}
          />

          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duration (milliseconds)"
                placeholder="e.g. 1500"
                fullWidth
                margin="normal"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                disabled={isSubmitting}
              />
            )}
          />

          <Typography variant="caption" color="text.secondary">
            Duration in milliseconds (1000ms = 1 second)
          </Typography>

          {createTaskMutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {createTaskMutation.error instanceof AxiosError
                ? createTaskMutation.error?.response?.data?.message
                : "An error occurred while creating the task"}
            </Alert>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              color="primary"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
