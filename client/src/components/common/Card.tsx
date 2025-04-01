import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  CardActions,
} from "@mui/material";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  footer,
}) => {
  return (
    <MuiCard className={className} sx={{ mb: 3 }}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
      {footer && <CardActions>{footer}</CardActions>}
    </MuiCard>
  );
};
