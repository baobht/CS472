import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({ message: "Route not found" });
};

export default notFound;
