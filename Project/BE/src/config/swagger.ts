import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ReviewMe API",
      version: "1.0.0",
      description: "API documentation for ReviewMe",
    },
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "615c1b8f1c4a4c3a9c5e4f1a" },
            name: { type: "string", example: "Awesome Product" },
            description: {
              type: "string",
              example: "This is a great product.",
            },
            category: { type: "string", example: "Electronics" },
            price: { type: "number", example: 99.99 },
            dateAdded: { type: "string", format: "date-time" },
            averageRating: { type: "number", example: 4.5 },
            imageUrl: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
          },
        },
        ProductInput: {
          type: "object",
          required: ["name", "price", "description", "category"],
          properties: {
            name: {
              type: "string",
              example: "Wireless Headphones",
            },
            price: {
              type: "number",
              format: "float",
              example: 99.99,
            },
            description: {
              type: "string",
              example:
                "High-quality noise-cancelling wireless headphones with 40-hour battery life.",
            },
            category: {
              type: "string",
              example: "Electronics",
            },
            imageUrl: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            _id: { type: "string", example: "615c1f3b1c4a4c3a9c5e4f1b" },
            productId: { type: "string", example: "615c1b8f1c4a4c3a9c5e4f1a" },
            author: { type: "string", example: "John Doe" },
            rating: {
              type: "integer",
              format: "int32",
              minimum: 1,
              maximum: 5,
              example: 5,
            },
            comment: { type: "string", example: "Great product!" },
            date: { type: "string", format: "date-time" },
          },
        },
        ReviewInput: {
          type: "object",
          required: ["author", "rating", "comment"],
          properties: {
            author: {
              type: "string",
              example: "Jane Doe",
            },
            rating: {
              type: "integer",
              format: "int32",
              minimum: 1,
              maximum: 5,
              example: 5,
            },
            comment: {
              type: "string",
              example: "Absolutely loved this product!",
            },
          },
        },
        ReviewUpdateInput: {
          type: "object",
          properties: {
            rating: {
              type: "integer",
              format: "int32",
              minimum: 1,
              maximum: 5,
              example: 4,
            },
            comment: {
              type: "string",
              example: "Updated comment text here.",
            },
          },
          required: ["rating", "comment"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // your route files with JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
