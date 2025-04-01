import React from "react";
import { Box, Chip } from "@mui/material";

interface StatusIndicatorProps {
  status:
    | "idle"
    | "working"
    | "error"
    | "available"
    | "assigned"
    | "in_progress"
    | "completed";
  showLabel?: boolean;
  size?: "small" | "medium";
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
  size = "medium",
  className = "",
}) => {
  const statusConfig = {
    idle: { color: "info", label: "Idle" },
    working: { color: "success", label: "Working" },
    error: { color: "error", label: "Error" },
    available: { color: "default", label: "Available" },
    assigned: { color: "warning", label: "Assigned" },
    in_progress: { color: "info", label: "In Progress" },
    completed: { color: "success", label: "Completed" },
  };

  const colorMap = {
    info: "info",
    success: "success",
    error: "error",
    default: "default",
    warning: "warning",
  };

  return (
    <Box className={className}>
      {showLabel ? (
        <Chip
          size={size}
          label={statusConfig[status].label}
          color={colorMap[statusConfig[status].color]}
        />
      ) : (
        <Box
          sx={{
            width: size === "small" ? 8 : 12,
            height: size === "small" ? 8 : 12,
            borderRadius: "50%",
            bgcolor: `${statusConfig[status].color}.main`,
            display: "inline-block",
          }}
        />
      )}
    </Box>
  );
};
