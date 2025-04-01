import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { API_ENDPOINTS } from "@/constants";
import {
  ApiResponse,
  Bot,
  BotTasksResponse,
  CreateBotFormData,
  Task,
} from "@/types";

export const botKeys = {
  all: ["bots"] as const,
  detail: (id: string) => [...botKeys.all, id] as const,
  tasks: (id: string) => [...botKeys.detail(id), "tasks"] as const,
};

export const useGetBots = () => {
  return useQuery({
    queryKey: botKeys.all,
    queryFn: async () => {
      const response = await api.get<ApiResponse<Bot[]>>(API_ENDPOINTS.BOTS);
      return response.data.data || [];
    },
  });
};

export const useGetBot = (id: string) => {
  return useQuery({
    queryKey: botKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Bot>>(
        `${API_ENDPOINTS.BOTS}/${id}`,
      );
      return response.data.data || null;
    },
    enabled: !!id,
  });
};

export const useCreateBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBotFormData): Promise<BotTasksResponse> => {
      const response = await api.post<ApiResponse<BotTasksResponse>>(
        API_ENDPOINTS.BOTS,
        data,
      );
      return response.data.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: botKeys.all });

      queryClient.setQueryData<Bot[]>(botKeys.all, (old = []) => [
        ...old,
        data.bot,
      ]);
    },
  });
};

export const useDeleteBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      const response = await api.delete<ApiResponse<null>>(
        `${API_ENDPOINTS.BOTS}/${id}`,
      );
      return response.data.success;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: botKeys.all });

      queryClient.setQueryData<Bot[]>(botKeys.all, (old = []) =>
        old.filter((bot) => bot._id !== id),
      );
    },
  });
};

export const useGetBotTasks = (botId: string) => {
  return useQuery({
    queryKey: botKeys.tasks(botId),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Task[]>>(
        `${API_ENDPOINTS.BOTS}/${botId}/tasks`,
      );
      return response.data.data || [];
    },
    enabled: !!botId,
  });
};
