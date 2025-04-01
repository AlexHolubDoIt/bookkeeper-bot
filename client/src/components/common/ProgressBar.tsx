import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  height?: number;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = "primary",
  height = 10,
  showLabel = false,
  className = "",
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <Box className={className} sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{ height, borderRadius: height / 2 }}
      />
      {showLabel && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {percentage.toFixed(0)}%
        </Typography>
      )}
    </Box>
  );
};
