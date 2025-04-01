"use strict";
exports.__esModule = true;
exports.RealTimeTaskProgress = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var RealTimeTaskProgress = function (_a) {
    var task = _a.task, forceUpdate = _a.forceUpdate;
    var theme = (0, material_1.useTheme)();
    var _b = (0, react_1.useState)(0), progress = _b[0], setProgress = _b[1];
    var _c = (0, react_1.useState)(""), timeRemaining = _c[0], setTimeRemaining = _c[1];
    (0, react_1.useEffect)(function () {
        if (task.completed || !task.startTime) {
            setProgress(task.completed ? 100 : 0);
            setTimeRemaining(task.completed ? "Completed" : "Not started");
            return;
        }
        var startTime = new Date(task.startTime).getTime();
        var duration = task.duration;
        var updateProgress = function () {
            var now = Date.now();
            var elapsed = now - startTime;
            var calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
            setProgress(calculatedProgress);
            var remainingTime = Math.max(0, duration - elapsed);
            if (remainingTime <= 0 || calculatedProgress >= 100) {
                setTimeRemaining("Completing...");
            }
            else {
                var seconds = Math.floor(remainingTime / 1000);
                if (seconds < 60) {
                    setTimeRemaining("".concat(seconds, "s"));
                }
                else {
                    var minutes = Math.floor(seconds / 60);
                    var remainingSeconds = seconds % 60;
                    setTimeRemaining("".concat(minutes, "m ").concat(remainingSeconds, "s"));
                }
            }
        };
        updateProgress();
        var interval = setInterval(updateProgress, 250); // Update 4 times per second
        return function () { return clearInterval(interval); };
    }, [task.completed, task.startTime, task.duration, forceUpdate]);
    var getColor = function () {
        if (task.completed)
            return "success";
        if (progress < 30)
            return "warning";
        if (progress < 70)
            return "info";
        return "success";
    };
    return (react_1["default"].createElement(material_1.Box, null,
        react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 },
            react_1["default"].createElement(material_1.Typography, { variant: "caption", fontWeight: "medium", color: "text.secondary" }, "Progress"),
            react_1["default"].createElement(material_1.Typography, { variant: "caption", fontWeight: "medium", sx: {
                    color: task.completed
                        ? theme.palette.success.main
                        : theme.palette.text.secondary
                } }, timeRemaining)),
        react_1["default"].createElement(material_1.LinearProgress, { variant: "determinate", value: progress, color: getColor(), sx: { height: 6, borderRadius: 3 } }),
        react_1["default"].createElement(material_1.Typography, { variant: "caption", display: "flex", justifyContent: "flex-end", mt: 0.5 },
            progress,
            "%")));
};
exports.RealTimeTaskProgress = RealTimeTaskProgress;
