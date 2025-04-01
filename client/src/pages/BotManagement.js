"use strict";
exports.__esModule = true;
exports.BotManagement = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var services_1 = require("@/services");
var bots_1 = require("@/components/bots");
var layout_1 = require("@/components/layout");
var BotManagement = function () {
    var _a = (0, services_1.useGetAvailableTasks)().data, availableTasks = _a === void 0 ? [] : _a;
    return (react_1["default"].createElement(layout_1.MainLayout, null,
        react_1["default"].createElement(material_1.Container, { maxWidth: "xl" },
            react_1["default"].createElement(material_1.Box, { my: 4 },
                react_1["default"].createElement(material_1.Typography, { variant: "h4", component: "h1", gutterBottom: true, fontWeight: "bold" }, "Bot Management"),
                react_1["default"].createElement(material_1.Typography, { variant: "subtitle1", color: "text.secondary", paragraph: true }, "Create and manage your bookkeeping bots"),
                react_1["default"].createElement(material_1.Grid, { container: true, spacing: 3 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, md: 4 },
                        react_1["default"].createElement(bots_1.BotCreator, null),
                        react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: { p: 3, mt: 3 } },
                            react_1["default"].createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Available Resources"),
                            react_1["default"].createElement(material_1.Divider, { sx: { mb: 2 } }),
                            react_1["default"].createElement(material_1.Box, null,
                                react_1["default"].createElement(material_1.Typography, { variant: "body2", gutterBottom: true },
                                    react_1["default"].createElement("strong", null, "Available Tasks:"),
                                    " ",
                                    availableTasks.length),
                                react_1["default"].createElement(material_1.Typography, { variant: "body2" },
                                    react_1["default"].createElement("strong", null, "Task Assignment:"),
                                    " Each bot is assigned 2 tasks automatically")))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, md: 8 },
                        react_1["default"].createElement(material_1.Paper, { elevation: 1, sx: {
                                p: 3,
                                minHeight: "70vh"
                            } },
                            react_1["default"].createElement(material_1.Typography, { variant: "h6", gutterBottom: true }, "Active Bots"),
                            react_1["default"].createElement(material_1.Divider, { sx: { mb: 3 } }),
                            react_1["default"].createElement(bots_1.BotList, null))))))));
};
exports.BotManagement = BotManagement;
