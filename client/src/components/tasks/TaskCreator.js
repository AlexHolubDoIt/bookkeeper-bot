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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TaskCreator = void 0;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var material_1 = require("@mui/material");
var schemas_1 = require("@/validation/schemas");
var services_1 = require("@/services");
var axios_1 = require("axios");
var TaskCreator = function () {
    var _a, _b, _c, _d;
    var createTaskMutation = (0, services_1.useCreateTask)();
    var _e = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(schemas_1.createTaskSchema),
        defaultValues: {
            description: "",
            duration: 1000
        }
    }), register = _e.register, control = _e.control, handleSubmit = _e.handleSubmit, reset = _e.reset, _f = _e.formState, errors = _f.errors, isSubmitting = _f.isSubmitting;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, createTaskMutation.mutateAsync(data)];
                case 1:
                    _a.sent();
                    reset();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Form submission error:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(material_1.Card, { sx: { mb: 3 } },
        react_1["default"].createElement(material_1.CardHeader, { title: "Create New Task" }),
        react_1["default"].createElement(material_1.CardContent, null,
            react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                react_1["default"].createElement(material_1.TextField, __assign({ label: "Task Description", placeholder: "e.g. process invoice", fullWidth: true, margin: "normal" }, register("description"), { error: !!errors.description, helperText: (_a = errors.description) === null || _a === void 0 ? void 0 : _a.message, disabled: isSubmitting })),
                react_1["default"].createElement(react_hook_form_1.Controller, { name: "duration", control: control, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (react_1["default"].createElement(material_1.TextField, __assign({}, field, { label: "Duration (milliseconds)", placeholder: "e.g. 1500", fullWidth: true, margin: "normal", type: "number", InputProps: { inputProps: { min: 1 } }, onChange: function (e) { return field.onChange(Number(e.target.value)); }, error: !!errors.duration, helperText: (_b = errors.duration) === null || _b === void 0 ? void 0 : _b.message, disabled: isSubmitting })));
                    } }),
                react_1["default"].createElement(material_1.Typography, { variant: "caption", color: "text.secondary" }, "Duration in milliseconds (1000ms = 1 second)"),
                createTaskMutation.isError && (react_1["default"].createElement(material_1.Alert, { severity: "error", sx: { mt: 2 } }, createTaskMutation.error instanceof axios_1.AxiosError
                    ? (_d = (_c = (_b = createTaskMutation.error) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message
                    : "An error occurred while creating the task")),
                react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "flex-end", mt: 2 },
                    react_1["default"].createElement(material_1.Button, { type: "submit", variant: "contained", disabled: isSubmitting, color: "primary" }, isSubmitting ? "Creating..." : "Create Task"))))));
};
exports.TaskCreator = TaskCreator;
