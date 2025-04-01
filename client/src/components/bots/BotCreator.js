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
exports.BotCreator = void 0;
// client/src/components/bots/BotCreator.tsx
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var material_1 = require("@mui/material");
var Close_1 = require("@mui/icons-material/Close");
var validation_1 = require("@/validation");
var services_1 = require("@/services");
var socketService_1 = require("../../services/socketService");
var BotCreator = function () {
    var _a;
    var _b = (0, services_1.useGetAvailableTasks)(), _c = _b.data, availableTasks = _c === void 0 ? [] : _c, tasksLoading = _b.isLoading;
    var createBotMutation = (0, services_1.useCreateBot)();
    var _d = (0, react_1.useState)(""), successMessage = _d[0], setSuccessMessage = _d[1];
    var _e = (0, react_1.useState)(false), socketCreated = _e[0], setSocketCreated = _e[1];
    var _f = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(validation_1.createBotSchema),
        defaultValues: {
            name: ""
        }
    }), register = _f.register, handleSubmit = _f.handleSubmit, reset = _f.reset, _g = _f.formState, errors = _g.errors, isSubmitting = _g.isSubmitting;
    // Listen for bot:created socket events
    (0, react_1.useEffect)(function () {
        var unsubscribe = socketService_1["default"].onBotCreated(function (data) {
            if (socketCreated) {
                setSuccessMessage("Bot \"".concat(data.bot.name, "\" was created and assigned ").concat(data.tasks.length, " tasks!"));
                setSocketCreated(false); // Reset after handling
            }
        });
        return function () { return unsubscribe(); };
    }, [socketCreated]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, createBotMutation.mutateAsync(data)];
                case 1:
                    _a.sent();
                    setSocketCreated(true); // Mark that we expect a socket event
                    reset(); // Reset the form on success
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Form submission error:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleCloseSnackbar = function () {
        setSuccessMessage("");
    };
    var notEnoughTasks = availableTasks.length < 2;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Card, { sx: { mb: 3 } },
            react_1["default"].createElement(material_1.CardHeader, { title: "Create New Bot" }),
            react_1["default"].createElement(material_1.CardContent, null,
                react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                    react_1["default"].createElement(material_1.TextField, __assign({ label: "Bot Name", placeholder: "e.g. BookkeeperBot", fullWidth: true, margin: "normal" }, register("name"), { error: !!errors.name, helperText: (_a = errors.name) === null || _a === void 0 ? void 0 : _a.message, disabled: isSubmitting || notEnoughTasks })),
                    react_1["default"].createElement(material_1.Box, { mt: 2 }, notEnoughTasks ? (react_1["default"].createElement(material_1.Alert, { severity: "warning" }, "Not enough available tasks. Add more tasks to create bots.")) : (react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                        availableTasks.length,
                        " tasks available for assignment"))),
                    createBotMutation.isError && (react_1["default"].createElement(material_1.Alert, { severity: "error", sx: { mt: 2 } }, createBotMutation.error instanceof Error
                        ? createBotMutation.error.message
                        : "An error occurred while creating the bot")),
                    react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "flex-end", mt: 2 },
                        react_1["default"].createElement(material_1.Button, { type: "submit", variant: "contained", disabled: isSubmitting || tasksLoading || notEnoughTasks, color: "primary" }, isSubmitting ? "Creating..." : "Create Bot"))))),
        react_1["default"].createElement(material_1.Snackbar, { open: !!successMessage, autoHideDuration: 6000, onClose: handleCloseSnackbar, message: successMessage, action: react_1["default"].createElement(material_1.IconButton, { size: "small", color: "inherit", onClick: handleCloseSnackbar },
                react_1["default"].createElement(Close_1["default"], { fontSize: "small" })) })));
};
exports.BotCreator = BotCreator;
