"use strict";
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
exports.BotList = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var services_1 = require("@/services");
var socketService_1 = require("../../services/socketService");
var common_1 = require("@/components/common");
var BotCard_1 = require("@/components/bots/BotCard");
var BotList = function () {
    var _a = (0, services_1.useGetBots)(), _b = _a.data, bots = _b === void 0 ? [] : _b, isLoading = _a.isLoading, error = _a.error, refetch = _a.refetch;
    var deleteBotMutation = (0, services_1.useDeleteBot)();
    // Listen for socket events to update bots
    (0, react_1.useEffect)(function () {
        var unsubscribeBotCreated = socketService_1["default"].onBotCreated(function () {
            refetch();
        });
        var unsubscribeTaskCompleted = socketService_1["default"].onTaskCompleted(function () {
            refetch();
        });
        return function () {
            unsubscribeBotCreated();
            unsubscribeTaskCompleted();
        };
    }, [refetch]);
    var handleDeleteBot = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Are you sure you want to delete this bot?")) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, deleteBotMutation.mutateAsync(id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error deleting bot:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading) {
        return (react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "center", py: 6 },
            react_1["default"].createElement(material_1.CircularProgress, null)));
    }
    if (error) {
        return (react_1["default"].createElement(material_1.Box, { py: 6 },
            react_1["default"].createElement(material_1.Typography, { color: "error", align: "center" },
                "Error loading bots:",
                " ",
                error instanceof Error ? error.message : "Unknown error")));
    }
    if (bots.length === 0) {
        return (react_1["default"].createElement(common_1.EmptyState, { title: "No bots available", description: "Create a bot to get started", icon: react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", width: "48", height: "48", stroke: "currentColor" },
                react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" })) }));
    }
    return (react_1["default"].createElement(material_1.Box, { sx: {
            display: "grid",
            gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)"
            },
            gap: 3
        } }, bots.map(function (bot) { return (react_1["default"].createElement(BotCard_1.BotCard, { key: bot._id, bot: bot, onDelete: handleDeleteBot })); })));
};
exports.BotList = BotList;
