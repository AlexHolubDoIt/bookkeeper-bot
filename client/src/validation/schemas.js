"use strict";
exports.__esModule = true;
exports.createTaskSchema = exports.createBotSchema = void 0;
var zod_1 = require("zod");
exports.createBotSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Bot name is required")
        .max(50, "Bot name must be less than 50 characters")
        .trim()
});
exports.createTaskSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, "Task description is required")
        .max(100, "Task description must be less than 100 characters")
        .trim(),
    duration: zod_1.z
        .number({ invalid_type_error: "Duration must be a number" })
        .int("Duration must be a whole number")
        .positive("Duration must be positive")
        .min(1, "Duration must be at least 1 millisecond")
});
