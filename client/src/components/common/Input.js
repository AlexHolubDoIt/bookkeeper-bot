"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Input = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var Input = function (_a) {
    var label = _a.label, error = _a.error, _b = _a.fullWidth, fullWidth = _b === void 0 ? false : _b, props = __rest(_a, ["label", "error", "fullWidth"]);
    return (react_1["default"].createElement(material_1.TextField, __assign({ label: label, error: !!error, helperText: error, fullWidth: fullWidth, variant: "outlined", margin: "normal" }, props)));
};
exports.Input = Input;
