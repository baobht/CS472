import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("🚀 ~ err.stack:", err.stack);

  if (err instanceof MongoServerError && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    res.status(400).json({
      message: `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`,
    });
    return;
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
