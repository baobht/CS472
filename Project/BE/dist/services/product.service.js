"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const getAllProducts = async () => {
    return await product_model_1.default.find();
};
const getProductById = async (id) => {
    return await product_model_1.default.findById(id);
};
const createProduct = async (data) => {
    const product = new product_model_1.default(data);
    return await product.save();
};
exports.default = {
    getAllProducts,
    getProductById,
    createProduct,
};
