export const COLORS = {
  primary: "#2563eb",
  secondary: "#6b7280",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  light: "#f3f4f6",
  dark: "#1f2937",
};

export const STATUS_COLORS = {
  idle: COLORS.info,
  working: COLORS.success,
  error: COLORS.danger,
  available: COLORS.light,
  assigned: COLORS.warning,
  in_progress: COLORS.info,
  completed: COLORS.success,
};
