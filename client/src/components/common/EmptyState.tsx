import React from "react";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <Box textAlign="center" py={6} px={4}>
      {icon && (
        <Box
          sx={{
            mx: "auto",
            height: 48,
            width: 48,
            color: "text.secondary",
            mb: 2,
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
};
