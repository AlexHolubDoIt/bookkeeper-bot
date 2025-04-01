"use strict";
exports.__esModule = true;
exports.StatusIndicator = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var StatusIndicator = function (_a) {
    var status = _a.status, _b = _a.showLabel, showLabel = _b === void 0 ? true : _b, _c = _a.size, size = _c === void 0 ? "medium" : _c, _d = _a.className, className = _d === void 0 ? "" : _d;
    var statusConfig = {
        idle: { color: "info", label: "Idle" },
        working: { color: "success", label: "Working" },
        error: { color: "error", label: "Error" },
        available: { color: "default", label: "Available" },
        assigned: { color: "warning", label: "Assigned" },
        in_progress: { color: "info", label: "In Progress" },
        completed: { color: "success", label: "Completed" }
    };
    var colorMap = {
        info: "info",
        success: "success",
        error: "error",
        "default": "default",
        warning: "warning"
    };
    return (react_1["default"].createElement(material_1.Box, { className: className }, showLabel ? (react_1["default"].createElement(material_1.Chip, { size: size, label: statusConfig[status].label, color: colorMap[statusConfig[status].color] })) : (react_1["default"].createElement(material_1.Box, { sx: {
            width: size === "small" ? 8 : 12,
            height: size === "small" ? 8 : 12,
            borderRadius: "50%",
            bgcolor: "".concat(statusConfig[status].color, ".main"),
            display: "inline-block"
        } }))));
};
exports.StatusIndicator = StatusIndicator;
