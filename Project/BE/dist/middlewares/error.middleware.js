"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof mongodb_1.MongoServerError && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        res.status(400).json({
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        });
        return;
    }
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.default = errorHandler;
