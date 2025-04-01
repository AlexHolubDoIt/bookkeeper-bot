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
exports.BotCard = void 0;
// client/src/components/bots/BotCard.tsx
var react_1 = require("react");
var material_1 = require("@mui/material");
var date_fns_1 = require("date-fns");
var services_1 = require("@/services");
var socketService_1 = require("../../services/socketService");
var react_query_1 = require("@tanstack/react-query");
var tasks_1 = require("../tasks");
var common_1 = require("@/components/common");
var BotCard = function (_a) {
    var bot = _a.bot, onDelete = _a.onDelete;
    var queryClient = (0, react_query_1.useQueryClient)();
    var _b = (0, services_1.useGetBotTasks)(bot._id), _c = _b.data, tasks = _c === void 0 ? [] : _c, tasksLoading = _b.isLoading, refetchTasks = _b.refetch;
    // Set up socket listeners to update this bot's tasks
    (0, react_1.useEffect)(function () {
        var unsubscribeTaskCompleted = socketService_1["default"].onTaskCompleted(function (data) {
            if (data.botId === bot._id) {
                // Refetch tasks for this bot
                refetchTasks();
                // Update bot data in cache
                queryClient.setQueryData(services_1.botKeys.detail(bot._id), function (oldData) {
                    if (!oldData)
                        return bot;
                    return __assign(__assign({}, oldData), { tasksCompleted: oldData.tasksCompleted + 1, status: "idle" });
                });
            }
        });
        return function () {
            unsubscribeTaskCompleted();
        };
    }, [bot._id, refetchTasks, queryClient, bot]);
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Are you sure you want to delete ".concat(bot.name, "?"))) return [3 /*break*/, 2];
                    return [4 /*yield*/, onDelete(bot._id)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var formatDate = function (dateString) {
        try {
            return (0, date_fns_1.format)(new Date(dateString), "MMM d, h:mm a");
        }
        catch (error) {
            return "Invalid date";
        }
    };
    return (react_1["default"].createElement(material_1.Card, { sx: { height: "100%", display: "flex", flexDirection: "column" } },
        react_1["default"].createElement(material_1.CardHeader, { title: react_1["default"].createElement(material_1.Box, { sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                } },
                react_1["default"].createElement(material_1.Box, { sx: { display: "flex", alignItems: "center" } },
                    react_1["default"].createElement(material_1.Typography, { variant: "h6", sx: { mr: 1 } }, bot.name),
                    react_1["default"].createElement(common_1.StatusIndicator, { status: bot.status })),
                react_1["default"].createElement(material_1.Button, { variant: "contained", color: "error", size: "small", onClick: handleDelete, sx: { ml: 2 } }, "Delete")) }),
        react_1["default"].createElement(material_1.CardContent, { sx: { flexGrow: 1 } }, tasksLoading ? (react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "center", py: 2 },
            react_1["default"].createElement(material_1.CircularProgress, { size: 24 }))) : (react_1["default"].createElement(tasks_1.TaskList, { tasks: tasks, emptyStateTitle: "No active tasks", emptyStateDescription: bot.status === "idle"
                ? "This bot has completed all assigned tasks"
                : "Waiting for task assignment" }))),
        react_1["default"].createElement(material_1.CardActions, { sx: {
                justifyContent: "space-between",
                px: 2,
                py: 1,
                borderTop: "1px solid #eee"
            } },
            react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                "Tasks completed: ",
                bot.tasksCompleted),
            react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                "Last active: ",
                formatDate(bot.lastActiveAt)))));
};
exports.BotCard = BotCard;
