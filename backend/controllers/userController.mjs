import { createUser } from "../models/userModel.mjs";

// User Creation controller

export const createUserController = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await createUser(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to create user", error: error.message });
  }
};
