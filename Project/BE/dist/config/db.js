"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let cachedConnection = null;
const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        const uri = process.env.MONGO_URI;
        if (!uri)
            throw new Error("MONGO_URI is not defined in environment variables");
        const conn = await mongoose_1.default.connect(uri, {});
        cachedConnection = conn;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    }
    catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
