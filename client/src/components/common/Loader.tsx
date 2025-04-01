import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface LoaderProps {
  size?: number;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = "primary",
  label,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <CircularProgress size={size} color={color} />
      {label && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {label}
        </Typography>
      )}
    </Box>
  );
};
