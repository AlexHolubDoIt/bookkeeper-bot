import React from "react";
import { Chip, ChipProps } from "@mui/material";

interface BadgeProps extends Omit<ChipProps, "color"> {
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "default";
  size?: "small" | "medium";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = "default",
  size = "medium",
  ...props
}) => {
  return (
    <Chip
      label={children}
      color={color === "default" ? undefined : color}
      size={size}
      {...props}
    />
  );
};
