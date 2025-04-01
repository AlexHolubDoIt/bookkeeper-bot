"use strict";
exports.__esModule = true;
exports.ProgressBar = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var ProgressBar = function (_a) {
    var value = _a.value, _b = _a.max, max = _b === void 0 ? 100 : _b, _c = _a.color, color = _c === void 0 ? "primary" : _c, _d = _a.height, height = _d === void 0 ? 10 : _d, _e = _a.showLabel, showLabel = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? "" : _f;
    var percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (react_1["default"].createElement(material_1.Box, { className: className, sx: { width: "100%" } },
        react_1["default"].createElement(material_1.LinearProgress, { variant: "determinate", value: percentage, color: color, sx: { height: height, borderRadius: height / 2 } }),
        showLabel && (react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary", sx: { mt: 0.5 } },
            percentage.toFixed(0),
            "%"))));
};
exports.ProgressBar = ProgressBar;
