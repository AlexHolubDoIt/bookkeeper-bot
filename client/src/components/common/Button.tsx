import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </MuiButton>
  );
};
