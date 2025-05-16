"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    categories: [String],
    reviews: [
        {
            userId: mongoose_1.Schema.ObjectId,
            description: String,
            rating: Number,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
