"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var constants_1 = require("@/constants");
var api = axios_1["default"].create({
    baseURL: constants_1.API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use(function (config) { return config; }, function (error) {
    return Promise.reject(error);
});
api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var _a, _b;
    var errorMessage = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message;
    console.error("API Error:", errorMessage);
    return Promise.reject(error);
});
exports["default"] = api;
