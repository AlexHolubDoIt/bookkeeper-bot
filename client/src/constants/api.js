"use strict";
exports.__esModule = true;
exports.SOCKET_URL = exports.API_ENDPOINTS = exports.API_BASE_URL = void 0;
exports.API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
exports.API_ENDPOINTS = {
    BOTS: "".concat(exports.API_BASE_URL, "/bots"),
    TASKS: "".concat(exports.API_BASE_URL, "/tasks"),
    AVAILABLE_TASKS: "".concat(exports.API_BASE_URL, "/tasks/available"),
    HEALTH: "".concat(exports.API_BASE_URL, "/health")
};
exports.SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
