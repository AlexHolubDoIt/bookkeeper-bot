"use strict";
exports.__esModule = true;
exports.Dashboard = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var services_1 = require("@/services");
var layout_1 = require("@/components/layout");
var bots_1 = require("@/components/bots");
var tasks_1 = require("@/components/tasks");
var Dashboard = function () {
    var _a = (0, services_1.useGetBots)(), _b = _a.data, bots = _b === void 0 ? [] : _b, botsLoading = _a.isLoading, botsError = _a.error;
    var _c = (0, services_1.useGetTasks)(), _d = _c.data, tasks = _d === void 0 ? [] : _d, tasksLoading = _c.isLoading, tasksError = _c.error;
    var hasError = botsError || tasksError;
    return (react_1["default"].createElement(layout_1.MainLayout, null,
        react_1["default"].createElement(material_1.Container, { maxWidth: "xl" },
            react_1["default"].createElement(material_1.Box, { my: 4 },
                react_1["default"].createElement(material_1.Typography, { variant: "h4", component: "h1", gutterBottom: true, fontWeight: "bold" }, "Dashboard"),
                react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", color: "text.secondary", paragraph: true }, "Monitor your bookkeeping bots and tasks"),
                hasError && (react_1["default"].createElement(material_1.Alert, { severity: "error", sx: { mb: 3 } },
                    react_1["default"].createElement(material_1.AlertTitle, null, "Error"),
                    botsError && (react_1["default"].createElement("div", null,
                        "Failed to load bots: ",
                        botsError.toString())),
                    tasksError && (react_1["default"].createElement("div", null,
                        "Failed to load tasks: ",
                        tasksError.toString())))),
                react_1["default"].createElement(bots_1.BotStats, { bots: bots }),
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, lg: 8 },
                        react_1["default"].createElement(material_1.Paper, { elevation: 0, sx: { p: 0 } },
                            react_1["default"].createElement(bots_1.BotList, null))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, lg: 4 },
                        react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: { p: 2 } },
                            react_1["default"].createElement(tasks_1.TaskProgress, { tasks: tasks, loading: tasksLoading }))))))));
};
exports.Dashboard = Dashboard;
