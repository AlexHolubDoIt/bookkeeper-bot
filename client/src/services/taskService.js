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
exports.initializeTasks = exports.useCreateTask = exports.useGetAvailableTasks = exports.useGetTasks = exports.taskKeys = void 0;
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("./api");
var constants_1 = require("@/constants");
var providers_1 = require("@/providers");
exports.taskKeys = {
    all: ["tasks"],
    available: function () { return __spreadArray(__spreadArray([], exports.taskKeys.all, true), ["available"], false); },
    detail: function (id) { return __spreadArray(__spreadArray([], exports.taskKeys.all, true), [id], false); }
};
var useGetTasks = function () {
    return (0, react_query_1.useQuery)({
        queryKey: exports.taskKeys.all,
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1["default"].get(constants_1.API_ENDPOINTS.TASKS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.data || []];
                }
            });
        }); }
    });
};
exports.useGetTasks = useGetTasks;
var useGetAvailableTasks = function () {
    return (0, react_query_1.useQuery)({
        queryKey: exports.taskKeys.available(),
        queryFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1["default"].get(constants_1.API_ENDPOINTS.AVAILABLE_TASKS)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.data || []];
                }
            });
        }); }
    });
};
exports.useGetAvailableTasks = useGetAvailableTasks;
var useCreateTask = function () {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api_1["default"].post(constants_1.API_ENDPOINTS.TASKS, data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.data];
                }
            });
        }); },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: exports.taskKeys.all });
            queryClient.invalidateQueries({ queryKey: exports.taskKeys.available() });
        }
    });
};
exports.useCreateTask = useCreateTask;
var initializeTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, _i, INITIAL_TASKS_1, task, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, api_1["default"].get(constants_1.API_ENDPOINTS.TASKS)];
            case 1:
                response = _a.sent();
                if (!(response.data.data && response.data.data.length === 0)) return [3 /*break*/, 6];
                _i = 0, INITIAL_TASKS_1 = constants_1.INITIAL_TASKS;
                _a.label = 2;
            case 2:
                if (!(_i < INITIAL_TASKS_1.length)) return [3 /*break*/, 5];
                task = INITIAL_TASKS_1[_i];
                return [4 /*yield*/, api_1["default"].post(constants_1.API_ENDPOINTS.TASKS, task)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("Initial tasks created successfully");
                providers_1.queryClient.invalidateQueries({ queryKey: exports.taskKeys.all });
                providers_1.queryClient.invalidateQueries({ queryKey: exports.taskKeys.available() });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.error("Error initializing tasks:", error_1);
                throw error_1;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.initializeTasks = initializeTasks;
