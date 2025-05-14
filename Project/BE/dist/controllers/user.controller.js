"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const user_service_1 = __importDefault(require("../services/user.service"));
// Controller method to get all users
const getAllUsers = async (req, res) => {
    const users = await user_service_1.default.getAllUsers();
    res.json({ data: users });
};
// Controller method to get user by ID
const getUserById = async (req, res) => {
    const user = await user_service_1.default.getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
};
// Controller method to create a user
const createUser = async (req, res) => {
    const { name, email } = req.body;
    const user = await user_service_1.default.createUser({ name, email });
    logger_1.default.info("User created: %s", user.email);
    res.status(201).json(user);
};
exports.default = {
    getAllUsers,
    getUserById,
    createUser,
};
