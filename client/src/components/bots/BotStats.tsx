import React, { useMemo } from "react";
import { Grid, Paper, Box, Typography, useTheme } from "@mui/material";
import RobotIcon from "@mui/icons-material/SmartToy";
import TaskIcon from "@mui/icons-material/Assignment";
import ActiveIcon from "@mui/icons-material/PlayCircleFilled";
import IdleIcon from "@mui/icons-material/PauseCircleFilled";
import { Bot } from "@/types";

interface BotStatsProps {
  bots: Bot[];
}

export const BotStats: React.FC<BotStatsProps> = ({ bots }) => {
  const theme = useTheme();

  const stats = useMemo(() => {
    const totalBots = bots.length;
    const activeBots = bots.filter((bot) => bot.status === "working").length;
    const idleBots = bots.filter((bot) => bot.status === "idle").length;
    const totalTasksCompleted = bots.reduce(
      (sum, bot) => sum + bot.tasksCompleted,
      0,
    );

    return {
      totalBots,
      activeBots,
      idleBots,
      totalTasksCompleted,
    };
  }, [bots]);

  const StatCard = ({
    title,
    value,
    icon,
    iconColor,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    iconColor: string;
  }) => (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: `${iconColor}.lighter`,
              color: `${iconColor}.main`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box mb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bots"
            value={stats.totalBots}
            icon={<RobotIcon fontSize="large" />}
            iconColor="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Working Bots"
            value={stats.activeBots}
            icon={<ActiveIcon fontSize="large" />}
            iconColor="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Idle Bots"
            value={stats.idleBots}
            icon={<IdleIcon fontSize="large" />}
            iconColor="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tasks Completed"
            value={stats.totalTasksCompleted}
            icon={<TaskIcon fontSize="large" />}
            iconColor="info"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
