"use strict";
exports.__esModule = true;
exports.Card = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var Card = function (_a) {
    var title = _a.title, children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, footer = _a.footer;
    return (react_1["default"].createElement(material_1.Card, { className: className, sx: { mb: 3 } },
        title && react_1["default"].createElement(material_1.CardHeader, { title: title }),
        react_1["default"].createElement(material_1.CardContent, null, children),
        footer && react_1["default"].createElement(material_1.CardActions, null, footer)));
};
exports.Card = Card;
