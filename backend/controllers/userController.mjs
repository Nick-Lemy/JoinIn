import { userRegister, userLogin } from "../models/userModel.mjs";

export const userRegisterController = async (req, res) => {
  try {
    const newUser = await userRegister(req.body);
    req.session.isAuthenticated = true;
    req.session.user = newUser;
    console.log(req.session.user, newUser)
    return res.status(201).send(newUser);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to create user", error: error.message });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const findUser = await userLogin(req.body);
    if (findUser) {
      req.session.isAuthenticated = true;
      req.session.user = findUser
      console.log(req.session.user)
      return res.status(200).send({ login: true });
    } else {
      return res.status(404).send({ login: false });
    }
  } catch (error) {
    return res
    .status(500)
    .send({ message: "Failed to create user", error: error.message })
  }
};
