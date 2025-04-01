"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var constants_1 = require("@/constants");
var SocketService = /** @class */ (function () {
    function SocketService() {
        this.socket = null;
        this.reconnectTimer = null;
        this.eventHandlers = {};
        this.isConnecting = false;
    }
    SocketService.prototype.connect = function () {
        var _this = this;
        if (this.socket || this.isConnecting)
            return;
        this.isConnecting = true;
        console.log("Connecting to socket server:", constants_1.SOCKET_URL);
        try {
            this.socket = (0, socket_io_client_1.io)(constants_1.SOCKET_URL, {
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000
            });
            this.socket.on("connect", function () {
                var _a;
                console.log("Socket connected, ID:", (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.id);
                _this.isConnecting = false;
                // Clear any reconnect timer
                if (_this.reconnectTimer) {
                    clearTimeout(_this.reconnectTimer);
                    _this.reconnectTimer = null;
                }
            });
            this.socket.on("disconnect", function (reason) {
                console.log("Socket disconnected:", reason);
                // If disconnected for errors that won't trigger reconnect
                if (reason === "io server disconnect" ||
                    reason === "io client disconnect") {
                    // Set a timer to try reconnecting
                    _this.reconnectTimer = setTimeout(function () {
                        console.log("Attempting manual reconnection");
                        _this.connect();
                    }, 5000);
                }
            });
            this.socket.on("connect_error", function (error) {
                console.error("Socket connection error:", error);
                _this.isConnecting = false;
            });
            // Register event listeners
            this.setupEventListeners();
        }
        catch (error) {
            console.error("Error setting up socket connection:", error);
            this.isConnecting = false;
        }
    };
    SocketService.prototype.disconnect = function () {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    };
    SocketService.prototype.setupEventListeners = function () {
        var _this = this;
        if (!this.socket)
            return;
        // Clear existing listeners
        this.socket.removeAllListeners("bot:created");
        this.socket.removeAllListeners("task:completed");
        this.socket.removeAllListeners("task:progress");
        // Add registered handlers for each event
        Object.keys(this.eventHandlers).forEach(function (event) {
            _this.eventHandlers[event].forEach(function (handler) {
                var _a;
                (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.on(event, handler);
            });
        });
    };
    SocketService.prototype.on = function (event, handler) {
        var _this = this;
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(handler);
        // If socket is connected, add the listener immediately
        if (this.socket) {
            this.socket.on(event, handler);
        }
        // Return unsubscribe function
        return function () {
            _this.off(event, handler);
        };
    };
    SocketService.prototype.off = function (event, handler) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event] = this.eventHandlers[event].filter(function (h) { return h !== handler; });
        }
        if (this.socket) {
            this.socket.off(event, handler);
        }
    };
    // Specific event handlers with proper typing
    SocketService.prototype.onBotCreated = function (handler) {
        return this.on("bot:created", handler);
    };
    SocketService.prototype.onTaskCompleted = function (handler) {
        return this.on("task:completed", handler);
    };
    SocketService.prototype.onTaskProgress = function (handler) {
        return this.on("task:progress", handler);
    };
    // Check if socket is currently connected
    SocketService.prototype.isConnected = function () {
        var _a;
        return ((_a = this.socket) === null || _a === void 0 ? void 0 : _a.connected) || false;
    };
    return SocketService;
}());
// Singleton instance
exports["default"] = new SocketService();
