"use strict";
exports.__esModule = true;
exports.Loader = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var Loader = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 40 : _b, _c = _a.color, color = _c === void 0 ? "primary" : _c, label = _a.label;
    return (react_1["default"].createElement(material_1.Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 },
        react_1["default"].createElement(material_1.CircularProgress, { size: size, color: color }),
        label && (react_1["default"].createElement(material_1.Typography, { variant: "body2", sx: { mt: 1 } }, label))));
};
exports.Loader = Loader;
