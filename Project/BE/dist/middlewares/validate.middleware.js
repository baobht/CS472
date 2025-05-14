"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        req.validatedBody = schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.errors });
    }
};
exports.default = validate;
