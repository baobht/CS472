"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_validator_1 = require("../validators/user.validator");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controller_1.default.getAllUsers);
userRoutes.get("/:id", user_controller_1.default.getUserById);
userRoutes.post("/", (0, validate_middleware_1.default)(user_validator_1.createUserSchema), user_controller_1.default.createUser);
exports.default = userRoutes;
