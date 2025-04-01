import { z } from "zod";

export const createBotSchema = z.object({
  name: z
    .string()
    .min(1, "Bot name is required")
    .max(50, "Bot name must be less than 50 characters")
    .trim(),
});

export type CreateBotFormData = z.infer<typeof createBotSchema>;

export const createTaskSchema = z.object({
  description: z
    .string()
    .min(1, "Task description is required")
    .max(100, "Task description must be less than 100 characters")
    .trim(),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .int("Duration must be a whole number")
    .positive("Duration must be positive")
    .min(1, "Duration must be at least 1 millisecond"),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
