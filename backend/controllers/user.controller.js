import { CustomError } from "../core/errors.js";
import DB from "../db/index.js";

export const getUser = (req, res) => {
  const { id } = req.params;
  if (req.user.id !== Number(id)) {
    throw new CustomError("Unauthorized", 401);
  }
  const user = DB.getUserById(id);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  res.send(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  if (req.user.id !== Number(id)) {
    throw new CustomError("Unauthorized", 401);
  }
  const updatedUser = DB.updateUser(id, req.body);
  if (!updatedUser) {
    throw new CustomError("User not found", 404);
  }
  res.send(updatedUser);
}