"use strict";
exports.__esModule = true;
exports.TaskCard = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var socketService_1 = require("@/services/socketService");
var RealTimeTaskProgress_1 = require("./RealTimeTaskProgress");
var TaskCard = function (_a) {
    var task = _a.task;
    var _b = (0, react_1.useState)(false), forceUpdate = _b[0], setForceUpdate = _b[1];
    // Listen for task completed event
    (0, react_1.useEffect)(function () {
        var unsubscribe = socketService_1["default"].onTaskCompleted(function (data) {
            if (data.taskId === task._id) {
                setForceUpdate(function (prev) { return !prev; }); // Toggle to force update
            }
        });
        return function () { return unsubscribe(); };
    }, [task._id]);
    // Get color based on task status
    var getStatusColor = function () {
        switch (task.status) {
            case "completed":
                return "success";
            case "in_progress":
                return "info";
            case "assigned":
                return "warning";
            default:
                return "default";
        }
    };
    // Capitalize first letter
    var capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: {
            p: 2,
            borderLeft: 4,
            borderColor: "".concat(getStatusColor(), ".main"),
            transition: "all 0.2s",
            "&:hover": {
                boxShadow: 3
            }
        } },
        react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 },
            react_1["default"].createElement(material_1.Box, null,
                react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", sx: { textTransform: "capitalize" } }, task.description),
                react_1["default"].createElement(material_1.Box, { display: "flex", alignItems: "center", mt: 0.5, gap: 1 },
                    react_1["default"].createElement(material_1.Chip, { label: capitalize(task.status.replace("_", " ")), color: getStatusColor(), size: "small", variant: "outlined" }),
                    react_1["default"].createElement(material_1.Typography, { variant: "caption", color: "text.secondary" },
                        "Duration: ",
                        (task.duration / 1000).toFixed(1),
                        "s")))),
        react_1["default"].createElement(RealTimeTaskProgress_1.RealTimeTaskProgress, { key: task._id, task: task, forceUpdate: forceUpdate })));
};
exports.TaskCard = TaskCard;
