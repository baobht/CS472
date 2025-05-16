"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const product_service_1 = __importDefault(require("../services/product.service"));
const getAllProducts = async (req, res) => {
    const products = await product_service_1.default.getAllProducts();
    console.log(123);
    res.json({ asdsadsad: products });
};
const getProductById = async (req, res) => {
    const product = await product_service_1.default.getProductById(req.params.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    res.json(product);
};
const createProduct = async (req, res) => {
    const { name, description } = req.body;
    const product = await product_service_1.default.createProduct({ name, description });
    logger_1.default.info("Product created: %s", product.name);
    res.status(201).json(product);
};
exports.default = {
    getAllProducts,
    getProductById,
    createProduct,
};
