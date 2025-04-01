"use strict";
exports.__esModule = true;
exports.EmptyState = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var EmptyState = function (_a) {
    var title = _a.title, description = _a.description, icon = _a.icon, action = _a.action;
    return (react_1["default"].createElement(material_1.Box, { textAlign: "center", py: 6, px: 4 },
        icon && (react_1["default"].createElement(material_1.Box, { sx: {
                mx: "auto",
                height: 48,
                width: 48,
                color: "text.secondary",
                mb: 2
            } }, icon)),
        react_1["default"].createElement(material_1.Typography, { variant: "h6", color: "text.primary" }, title),
        description && (react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary", sx: { mt: 1 } }, description)),
        action && react_1["default"].createElement(material_1.Box, { sx: { mt: 3 } }, action)));
};
exports.EmptyState = EmptyState;
