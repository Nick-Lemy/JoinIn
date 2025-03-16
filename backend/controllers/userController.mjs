import { createUser, showAllUsers } from "../models/userModel.mjs";

// User Creation controller

export const createUserController = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to create user", error: error.message });
  }
};

export const checkIfUserExists = async (req, res) => {
  try {
    const { email, password } = req.body;
    const allUsers = await showAllUsers();
    const findUser = allUsers.find(
      (user) => user.email === email && user.password === password
    );
    res.status(200).send(allUsers);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to get users", error: error.message });
  }
};
