"use strict";
exports.__esModule = true;
exports.TaskProgress = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var TaskProgress = function (_a) {
    var _b = _a.tasks, tasks = _b === void 0 ? [] : _b, _c = _a.loading, loading = _c === void 0 ? false : _c;
    var stats = (0, react_1.useMemo)(function () {
        var totalTasks = tasks.length;
        var completedTasks = tasks.filter(function (task) { return task.completed; }).length;
        var inProgressTasks = tasks.filter(function (task) { return !task.completed && task.status === "in_progress"; }).length;
        var waitingTasks = tasks.filter(function (task) { return task.status === "available"; }).length;
        var overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        return {
            totalTasks: totalTasks,
            completedTasks: completedTasks,
            inProgressTasks: inProgressTasks,
            waitingTasks: waitingTasks,
            overallProgress: overallProgress
        };
    }, [tasks]);
    if (loading) {
        return (react_1["default"].createElement(material_1.Box, { p: 2, display: "flex", justifyContent: "center" },
            react_1["default"].createElement(material_1.CircularProgress, null)));
    }
    var StatCard = function (_a) {
        var title = _a.title, value = _a.value, color = _a.color;
        return (react_1["default"].createElement(material_1.Paper, { elevation: 0, sx: {
                bgcolor: "".concat(color, ".lighter"),
                p: 1.5,
                borderRadius: 2,
                border: 1,
                borderColor: "".concat(color, ".light"),
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            } },
            react_1["default"].createElement(material_1.Typography, { variant: "h4", component: "div", fontWeight: "bold", color: "".concat(color, ".dark") }, value),
            react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "".concat(color, ".dark") }, title)));
    };
    return (react_1["default"].createElement(material_1.Box, null,
        react_1["default"].createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Task Progress"),
        react_1["default"].createElement(material_1.Box, { mb: 3 },
            react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between", mb: 1 },
                react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" }, "Overall Progress"),
                react_1["default"].createElement(material_1.Typography, { variant: "body2", fontWeight: "medium" },
                    stats.completedTasks,
                    " / ",
                    stats.totalTasks)),
            react_1["default"].createElement(material_1.LinearProgress, { variant: "determinate", value: stats.overallProgress, sx: { height: 8, borderRadius: 1 } }),
            react_1["default"].createElement(material_1.Typography, { variant: "caption", color: "text.secondary", sx: { mt: 0.5, display: "block" } },
                stats.overallProgress.toFixed(0),
                "% complete")),
        react_1["default"].createElement(material_1.Divider, { sx: { my: 2 } }),
        react_1["default"].createElement(material_1.Typography, { variant: "subtitle2", mb: 2 }, "Task Status"),
        react_1["default"].createElement(material_1.Grid, { container: true, spacing: 2 },
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 4 },
                react_1["default"].createElement(StatCard, { title: "Completed", value: stats.completedTasks, color: "success" })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 4 },
                react_1["default"].createElement(StatCard, { title: "In Progress", value: stats.inProgressTasks, color: "info" })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 4 },
                react_1["default"].createElement(StatCard, { title: "Waiting", value: stats.waitingTasks, color: "warning" })))));
};
exports.TaskProgress = TaskProgress;
