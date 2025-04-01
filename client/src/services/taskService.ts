import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { API_ENDPOINTS, INITIAL_TASKS } from "@/constants";
import { ApiResponse, CreateTaskFormData, Task } from "@/types";
import { queryClient } from "@/providers";

export const taskKeys = {
  all: ["tasks"] as const,
  available: () => [...taskKeys.all, "available"] as const,
  detail: (id: string) => [...taskKeys.all, id] as const,
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: async () => {
      const response = await api.get<ApiResponse<Task[]>>(API_ENDPOINTS.TASKS);
      return response.data.data || [];
    },
  });
};

export const useGetAvailableTasks = () => {
  return useQuery({
    queryKey: taskKeys.available(),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Task[]>>(
        API_ENDPOINTS.AVAILABLE_TASKS,
      );
      return response.data.data || [];
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskFormData): Promise<Task> => {
      const response = await api.post<ApiResponse<Task>>(
        API_ENDPOINTS.TASKS,
        data,
      );
      return response.data.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: taskKeys.available() });
    },
  });
};

export const initializeTasks = async (): Promise<void> => {
  try {
    const response = await api.get<ApiResponse<Task[]>>(API_ENDPOINTS.TASKS);

    if (response.data.data && response.data.data.length === 0) {
      for (const task of INITIAL_TASKS) {
        await api.post<ApiResponse<Task>>(API_ENDPOINTS.TASKS, task);
      }
      console.log("Initial tasks created successfully");

      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: taskKeys.available() });
    }
  } catch (error) {
    console.error("Error initializing tasks:", error);
    throw error;
  }
};
