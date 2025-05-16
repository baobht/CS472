"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const product_validator_1 = require("../validators/product.validator");
const productRoutes = (0, express_1.Router)();
productRoutes.get("/", product_controller_1.default.getAllProducts);
productRoutes.get("/:id", product_controller_1.default.getProductById);
productRoutes.post("/", (0, validate_middleware_1.default)(product_validator_1.createProductSchema), product_controller_1.default.createProduct);
exports.default = productRoutes;
