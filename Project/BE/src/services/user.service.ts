import User, { IUser } from "../models/user.model";

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

const createUser = async (data: {
  name: string;
  email: string;
}): Promise<IUser> => {
  const user = new User(data);
  return await user.save();
};

export default {
  getAllUsers,
  getUserById,
  createUser,
};
