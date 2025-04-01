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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.useSocket = void 0;
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var socketService_1 = require("@/services/socketService");
var services_1 = require("@/services");
/**
 * Custom hook to handle WebSocket events and update the query cache accordingly
 */
var useSocket = function () {
    var queryClient = (0, react_query_1.useQueryClient)();
    var isConnected = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (!isConnected.current) {
            // Connect to WebSocket
            socketService_1["default"].connect();
            isConnected.current = true;
            // Handle bot created event
            var unsubscribeBotCreated_1 = socketService_1["default"].onBotCreated(function (data) {
                console.log("Socket event: bot:created", data);
                // Update bots list in cache
                queryClient.setQueryData(services_1.botKeys.all, function (oldData) {
                    if (oldData === void 0) { oldData = []; }
                    // If the bot already exists in cache, don't add it again
                    if (oldData.find(function (bot) { return bot._id === data.bot._id; })) {
                        return oldData;
                    }
                    return __spreadArray(__spreadArray([], oldData, true), [data.bot], false);
                });
                // Update available tasks list (tasks are now assigned)
                queryClient.invalidateQueries({ queryKey: services_1.taskKeys.available() });
                // Update all tasks list
                queryClient.invalidateQueries({ queryKey: services_1.taskKeys.all });
            });
            // Handle task completed event
            var unsubscribeTaskCompleted_1 = socketService_1["default"].onTaskCompleted(function (data) {
                console.log("Socket event: task:completed", data);
                // Update the bot in cache
                queryClient.setQueryData(services_1.botKeys.all, function (oldData) {
                    if (oldData === void 0) { oldData = []; }
                    return oldData.map(function (bot) {
                        if (bot._id === data.botId) {
                            return __assign(__assign({}, bot), { tasksCompleted: bot.tasksCompleted + 1, status: bot.status === "working" ? "idle" : bot.status });
                        }
                        return bot;
                    });
                });
                // Update the specific bot if it's being viewed
                queryClient.invalidateQueries({
                    queryKey: services_1.botKeys.detail(data.botId)
                });
                // Update bot tasks
                queryClient.invalidateQueries({
                    queryKey: services_1.botKeys.tasks(data.botId)
                });
                // Update all tasks
                queryClient.setQueryData(services_1.taskKeys.all, function (oldData) {
                    if (oldData === void 0) { oldData = []; }
                    return oldData.map(function (task) {
                        if (task._id === data.taskId) {
                            return __assign(__assign({}, task), { status: "completed", completed: true, completedAt: new Date().toISOString() });
                        }
                        return task;
                    });
                });
            });
            // Handle task progress event
            var unsubscribeTaskProgress_1 = socketService_1["default"].onTaskProgress(function (data) {
                console.log("Socket event: task:progress", data);
                // We could update a task progress property here if we had one
                // For now, we'll just log this event
            });
            // Clean up listeners when component unmounts
            return function () {
                unsubscribeBotCreated_1();
                unsubscribeTaskCompleted_1();
                unsubscribeTaskProgress_1();
            };
        }
        // Keep socket connection alive for the app's lifetime
        return function () { };
    }, [queryClient]);
    return socketService_1["default"];
};
exports.useSocket = useSocket;
