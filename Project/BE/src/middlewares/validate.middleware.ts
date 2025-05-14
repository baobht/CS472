import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
    }
  }
}

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  };

export default validate;
