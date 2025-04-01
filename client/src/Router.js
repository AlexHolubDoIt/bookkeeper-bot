"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var constants_1 = require("./constants");
var pages_1 = require("./pages");
var hooks_1 = require("@/hooks");
var Router = function () {
    (0, hooks_1.useSocket)();
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: constants_1.ROUTES.HOME, element: react_1["default"].createElement(pages_1.Home, null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: constants_1.ROUTES.DASHBOARD, element: react_1["default"].createElement(pages_1.Dashboard, null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: constants_1.ROUTES.BOT_MANAGEMENT, element: react_1["default"].createElement(pages_1.BotManagement, null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: constants_1.ROUTES.TASK_ANALYTICS, element: react_1["default"].createElement(pages_1.TaskAnalytics, null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: constants_1.ROUTES.NOT_FOUND, element: react_1["default"].createElement(pages_1.NotFound, null) }))));
};
exports["default"] = Router;
