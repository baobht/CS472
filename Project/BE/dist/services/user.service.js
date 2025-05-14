"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllUsers = async () => {
    return await user_model_1.default.find();
};
const getUserById = async (id) => {
    return await user_model_1.default.findById(id);
};
const createUser = async (data) => {
    const user = new user_model_1.default(data);
    return await user.save();
};
exports.default = {
    getAllUsers,
    getUserById,
    createUser,
};
