import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useGetBots, useDeleteBot } from "@/services";
import socketService from "../../services/socketService";
import { EmptyState } from "@/components/common";
import { BotCard } from "@/components/bots/BotCard";

export const BotList: React.FC = () => {
  const { data: bots = [], isLoading, error, refetch } = useGetBots();

  const deleteBotMutation = useDeleteBot();

  useEffect(() => {
    const unsubscribeBotCreated = socketService.onBotCreated(() => {
      refetch();
    });

    const unsubscribeTaskCompleted = socketService.onTaskCompleted(() => {
      refetch();
    });

    return () => {
      unsubscribeBotCreated();
      unsubscribeTaskCompleted();
    };
  }, [refetch]);

  const handleDeleteBot = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this bot?")) {
      try {
        await deleteBotMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting bot:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={6}>
        <Typography color="error" align="center">
          Error loading bots:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Typography>
      </Box>
    );
  }

  if (bots.length === 0) {
    return (
      <EmptyState
        title="No bots available"
        description="Create a bot to get started"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
        }
      />
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {bots.map((bot) => (
        <BotCard key={bot._id} bot={bot} onDelete={handleDeleteBot} />
      ))}
    </Box>
  );
};
