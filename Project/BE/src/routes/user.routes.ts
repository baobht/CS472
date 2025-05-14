import { Router } from "express";
import userController from "../controllers/user.controller";
import validate from "../middlewares/validate.middleware";
import { createUserSchema } from "../validators/user.validator";

const userRoutes = Router();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.post("/", validate(createUserSchema), userController.createUser);

export default userRoutes;
