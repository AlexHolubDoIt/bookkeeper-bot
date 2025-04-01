"use strict";
exports.__esModule = true;
exports.STATUS_COLORS = exports.COLORS = void 0;
exports.COLORS = {
    primary: "#2563eb",
    secondary: "#6b7280",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
    light: "#f3f4f6",
    dark: "#1f2937"
};
exports.STATUS_COLORS = {
    idle: exports.COLORS.info,
    working: exports.COLORS.success,
    error: exports.COLORS.danger,
    available: exports.COLORS.light,
    assigned: exports.COLORS.warning,
    in_progress: exports.COLORS.info,
    completed: exports.COLORS.success
};
