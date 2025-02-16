import { CustomError } from "../core/errors.js";
import DB from "../db/index.js";
import { generateRandomId } from "../utils/helpers.js";

export const createUser = async (req, res) => {
  // generate a random id using Math.random() and Date.now()
  const id = generateRandomId();
  const user = { id, credits: 0 };
  DB.createUser(user);
  res.send(user);
};

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
