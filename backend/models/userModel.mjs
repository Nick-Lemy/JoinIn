import { User } from "../config/db.mjs";

// Create a user
export const createUser = async (userInfo) => {
  try {
    const user = await User.create(userInfo);
    return user;
  } catch (error) {
    console.error("Error Creating user: ", error);
    throw error;
  }
};

// Remove user
