"use strict";
exports.__esModule = true;
exports.BotStats = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var SmartToy_1 = require("@mui/icons-material/SmartToy");
var Assignment_1 = require("@mui/icons-material/Assignment");
var PlayCircleFilled_1 = require("@mui/icons-material/PlayCircleFilled");
var PauseCircleFilled_1 = require("@mui/icons-material/PauseCircleFilled");
var BotStats = function (_a) {
    var bots = _a.bots;
    var theme = (0, material_1.useTheme)();
    var stats = (0, react_1.useMemo)(function () {
        var totalBots = bots.length;
        var activeBots = bots.filter(function (bot) { return bot.status === "working"; }).length;
        var idleBots = bots.filter(function (bot) { return bot.status === "idle"; }).length;
        var totalTasksCompleted = bots.reduce(function (sum, bot) { return sum + bot.tasksCompleted; }, 0);
        return {
            totalBots: totalBots,
            activeBots: activeBots,
            idleBots: idleBots,
            totalTasksCompleted: totalTasksCompleted
        };
    }, [bots]);
    var StatCard = function (_a) {
        var title = _a.title, value = _a.value, icon = _a.icon, iconColor = _a.iconColor;
        return (react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: {
                p: 3,
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4]
                }
            } },
            react_1["default"].createElement(material_1.Grid, { container: true, spacing: 2, alignItems: "center" },
                react_1["default"].createElement(material_1.Grid, { item: true },
                    react_1["default"].createElement(material_1.Box, { sx: {
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: "".concat(iconColor, ".lighter"),
                            color: "".concat(iconColor, ".main"),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        } }, icon)),
                react_1["default"].createElement(material_1.Grid, { item: true, xs: true },
                    react_1["default"].createElement(material_1.Typography, { variant: "h4", component: "div", fontWeight: "bold" }, value),
                    react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" }, title)))));
    };
    return (react_1["default"].createElement(material_1.Box, { mb: 4 },
        react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3 },
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6, md: 3 },
                react_1["default"].createElement(StatCard, { title: "Total Bots", value: stats.totalBots, icon: react_1["default"].createElement(SmartToy_1["default"], { fontSize: "large" }), iconColor: "primary" })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6, md: 3 },
                react_1["default"].createElement(StatCard, { title: "Working Bots", value: stats.activeBots, icon: react_1["default"].createElement(PlayCircleFilled_1["default"], { fontSize: "large" }), iconColor: "success" })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6, md: 3 },
                react_1["default"].createElement(StatCard, { title: "Idle Bots", value: stats.idleBots, icon: react_1["default"].createElement(PauseCircleFilled_1["default"], { fontSize: "large" }), iconColor: "warning" })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, sm: 6, md: 3 },
                react_1["default"].createElement(StatCard, { title: "Tasks Completed", value: stats.totalTasksCompleted, icon: react_1["default"].createElement(Assignment_1["default"], { fontSize: "large" }), iconColor: "info" })))));
};
exports.BotStats = BotStats;
