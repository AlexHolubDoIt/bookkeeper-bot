"use strict";
exports.__esModule = true;
exports.NotFound = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var constants_1 = require("@/constants");
var common_1 = require("@/components/common");
var layout_1 = require("@/components/layout");
var NotFound = function () {
    return (react_1["default"].createElement(layout_1.MainLayout, null,
        react_1["default"].createElement("div", { className: "py-16 flex flex-col items-center" },
            react_1["default"].createElement("h1", { className: "text-9xl font-bold text-blue-600" }, "404"),
            react_1["default"].createElement("h2", { className: "text-2xl font-medium text-gray-800 mt-4" }, "Page Not Found"),
            react_1["default"].createElement("p", { className: "text-gray-600 mt-2" }, "The page you are looking for doesn't exist or has been moved."),
            react_1["default"].createElement(react_router_dom_1.Link, { to: constants_1.ROUTES.DASHBOARD, className: "mt-6" },
                react_1["default"].createElement(common_1.Button, null, "Back to Dashboard")))));
};
exports.NotFound = NotFound;
