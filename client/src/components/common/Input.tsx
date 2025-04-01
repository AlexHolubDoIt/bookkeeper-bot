import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "error"> {
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  ...props
}) => {
  return (
    <TextField
      label={label}
      error={!!error}
      helperText={error}
      fullWidth={fullWidth}
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
};
