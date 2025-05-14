// src/controllers/user.controller.ts
import { Request, Response } from "express";
import logger from "../config/logger";
import userService from "../services/user.service";

// Controller method to get all users
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  res.json({ data: users });
};

// Controller method to get user by ID
const getUserById = async (req: Request, res: Response): Promise<void> => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

// Controller method to create a user
const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  const user = await userService.createUser({ name, email });
  logger.info("User created: %s", user.email);
  res.status(201).json(user);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
};
