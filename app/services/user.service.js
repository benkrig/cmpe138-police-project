import { userModel } from "../models/user/user-model.js";

// TODO
const createUser = async ({}) => true;
const getUserById = async (id) => await userModel.getUserById(id);


export const userService = {
  createUser: createUser,
  getUserById: getUserById,
};
