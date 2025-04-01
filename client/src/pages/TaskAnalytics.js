"use strict";
exports.__esModule = true;
exports.TaskAnalytics = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var services_1 = require("@/services");
var tasks_1 = require("@/components/tasks");
var layout_1 = require("@/components/layout");
var TaskAnalytics = function () {
    var _a = (0, react_1.useState)(0), tabValue = _a[0], setTabValue = _a[1];
    var _b = (0, services_1.useGetTasks)(), _c = _b.data, allTasks = _c === void 0 ? [] : _c, isLoading = _b.isLoading, error = _b.error;
    var handleTabChange = function (_, newValue) {
        setTabValue(newValue);
    };
    var getTaskProgress = function (task) {
        if (task.completed)
            return 100;
        if (!task.startTime)
            return 0;
        var startTime = new Date(task.startTime).getTime();
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var progressPercent = Math.min(100, Math.floor((elapsedTime / task.duration) * 100));
        return progressPercent;
    };
    var getTimeRemaining = function (task) {
        if (task.completed)
            return "Completed";
        if (!task.startTime)
            return "Not started";
        var startTime = new Date(task.startTime).getTime();
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var remainingTime = Math.max(0, task.duration - elapsedTime);
        if (remainingTime <= 0)
            return "Completing...";
        var seconds = Math.floor(remainingTime / 1000);
        if (seconds < 60)
            return "".concat(seconds, "s");
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return "".concat(minutes, "m ").concat(remainingSeconds, "s");
    };
    var filteredTasks = react_1["default"].useMemo(function () {
        switch (tabValue) {
            case 0: // All tasks
                return allTasks;
            case 1: // In progress
                return allTasks.filter(function (task) { return task.status === "in_progress"; });
            case 2: // Available
                return allTasks.filter(function (task) { return task.status === "available"; });
            case 3: // Completed
                return allTasks.filter(function (task) { return task.completed; });
            default:
                return allTasks;
        }
    }, [allTasks, tabValue]);
    return (react_1["default"].createElement(layout_1.MainLayout, null,
        react_1["default"].createElement(material_1.Container, { maxWidth: "xl" },
            react_1["default"].createElement(material_1.Box, { my: 4 },
                react_1["default"].createElement(material_1.Typography, { variant: "h4", component: "h1", gutterBottom: true, fontWeight: "bold" }, "Task Analytics"),
                react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", color: "text.secondary", paragraph: true }, "Manage and monitor bookkeeping tasks"),
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, md: 4 },
                        react_1["default"].createElement(tasks_1.TaskCreator, null),
                        react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: { p: 3, mt: 3 } },
                            react_1["default"].createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Task Statistics"),
                            react_1["default"].createElement(material_1.Divider, { sx: { mb: 2 } }),
                            react_1["default"].createElement(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 1.5 } },
                                react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between" },
                                    react_1["default"].createElement(material_1.Typography, { variant: "body2" }, "Total Tasks:"),
                                    react_1["default"].createElement(material_1.Chip, { label: allTasks.length, size: "small", color: "primary" })),
                                react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between" },
                                    react_1["default"].createElement(material_1.Typography, { variant: "body2" }, "In Progress:"),
                                    react_1["default"].createElement(material_1.Chip, { label: allTasks.filter(function (t) { return t.status === "in_progress"; })
                                            .length, size: "small", color: "info" })),
                                react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between" },
                                    react_1["default"].createElement(material_1.Typography, { variant: "body2" }, "Available:"),
                                    react_1["default"].createElement(material_1.Chip, { label: allTasks.filter(function (t) { return t.status === "available"; }).length, size: "small", color: "warning" })),
                                react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between" },
                                    react_1["default"].createElement(material_1.Typography, { variant: "body2" }, "Completed:"),
                                    react_1["default"].createElement(material_1.Chip, { label: allTasks.filter(function (t) { return t.completed; }).length, size: "small", color: "success" }))))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, md: 8 },
                        react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: {
                                p: 3,
                                minHeight: "70vh"
                            } },
                            react_1["default"].createElement(material_1.Box, { sx: { borderBottom: 1, borderColor: "divider", mb: 3 } },
                                react_1["default"].createElement(material_1.Tabs, { value: tabValue, onChange: handleTabChange, "aria-label": "task tabs" },
                                    react_1["default"].createElement(material_1.Tab, { label: "All Tasks (".concat(allTasks.length, ")") }),
                                    react_1["default"].createElement(material_1.Tab, { label: "In Progress (".concat(allTasks.filter(function (t) { return t.status === "in_progress"; }).length, ")") }),
                                    react_1["default"].createElement(material_1.Tab, { label: "Available (".concat(allTasks.filter(function (t) { return t.status === "available"; }).length, ")") }),
                                    react_1["default"].createElement(material_1.Tab, { label: "Completed (".concat(allTasks.filter(function (t) { return t.completed; }).length, ")") }))),
                            error ? (react_1["default"].createElement(material_1.Alert, { severity: "error" },
                                "Error loading tasks:",
                                " ",
                                error instanceof Error ? error.message : "Unknown error")) : (react_1["default"].createElement(tasks_1.TaskList, { tasks: filteredTasks, loading: isLoading, getTaskProgress: getTaskProgress, getTimeRemaining: getTimeRemaining, emptyStateTitle: "No ".concat(tabValue === 0 ? "" : tabValue === 1 ? "in-progress" : tabValue === 2 ? "available" : "completed", " tasks found"), emptyStateDescription: "Create tasks to get started" })))))))));
};
exports.TaskAnalytics = TaskAnalytics;
