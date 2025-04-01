"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TaskList = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var services_1 = require("@/services");
var socketService_1 = require("../../services/socketService");
var TaskCard_1 = require("./TaskCard");
var common_1 = require("@/components/common");
var TaskList = function (_a) {
    var propTasks = _a.tasks, propLoading = _a.loading, _b = _a.emptyStateTitle, emptyStateTitle = _b === void 0 ? "No tasks available" : _b, emptyStateDescription = _a.emptyStateDescription, _c = _a.showCompleted, showCompleted = _c === void 0 ? true : _c;
    var _d = (0, services_1.useGetTasks)(), _e = _d.data, fetchedTasks = _e === void 0 ? [] : _e, fetchedLoading = _d.isLoading, refetch = _d.refetch;
    (0, react_1.useEffect)(function () {
        var unsubscribeBotCreated = socketService_1["default"].onBotCreated(function () {
            if (!propTasks)
                refetch();
        });
        var unsubscribeTaskCompleted = socketService_1["default"].onTaskCompleted(function () {
            if (!propTasks)
                refetch();
        });
        return function () {
            unsubscribeBotCreated();
            unsubscribeTaskCompleted();
        };
    }, [propTasks, refetch]);
    var tasks = propTasks || fetchedTasks;
    var loading = propLoading || (propTasks === undefined && fetchedLoading);
    if (loading) {
        return (react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "center", py: 3 },
            react_1["default"].createElement(material_1.CircularProgress, { size: 30 })));
    }
    // Filter tasks if showCompleted is false
    var filteredTasks = showCompleted
        ? tasks
        : tasks.filter(function (task) { return !task.completed; });
    if (filteredTasks.length === 0) {
        return (react_1["default"].createElement(common_1.EmptyState, { title: emptyStateTitle, description: emptyStateDescription, icon: react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", width: "48", height: "48", stroke: "currentColor" },
                react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })) }));
    }
    // Sort tasks: in-progress first, then by completion status
    var sortedTasks = __spreadArray([], filteredTasks, true).sort(function (a, b) {
        // First sort by completion status
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        // Then sort by status
        if (a.status !== b.status) {
            if (a.status === "in_progress")
                return -1;
            if (b.status === "in_progress")
                return 1;
        }
        // Finally, sort by start time (most recent first)
        if (a.startTime && b.startTime) {
            return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
        }
        return 0;
    });
    return (react_1["default"].createElement(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 2 } }, sortedTasks.map(function (task) { return (react_1["default"].createElement(TaskCard_1.TaskCard, { key: "".concat(task._id), task: task })); })));
};
exports.TaskList = TaskList;
