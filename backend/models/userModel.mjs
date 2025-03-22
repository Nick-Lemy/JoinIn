import { db } from "../config.mjs";
import { passwordHasher, verify } from "../config.mjs";

// Create a user
export const userRegister = async (userInfo) => {
  try {
    const { email, password, first_name, last_name, phone_number } =
      userInfo;
    const password_hash = await passwordHasher(password)
    const user = await db.sql(`
USE DATABASE database.sqlite; 
INSERT INTO users (email, password_hash, first_name, last_name, phone_number)
VALUES ('${email}', '${password_hash}', '${first_name}', '${last_name}', '${phone_number}', '${Date.now()}');
`);
    return user;
  } catch (error) {
    console.error("Error Creating user: ", error);
    throw error;
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const allUsers = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM users
      `);
    const findUser = allUsers.find(
       (user) => user["email"] === email
    );
    const passwordVerification = await verify(password, findUser.password_hash)
    if(passwordVerification && findUser) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error retrieving users: ", error);
    throw error;
  }
};
