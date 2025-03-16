import { User } from "../config/db.mjs";
import { db } from "../server.mjs";

// Create a user
export const createUser = async (userInfo) => {
  try {
    const { email, password_hash, first_name, last_name, phone_number } =
      userInfo;
    const user = await db.sql(`
INSERT INTO users (email, password_hash, first_name, last_name, phone_number)
VALUES ('${email}', '${password_hash}', '${first_name}', '${last_name}', '${phone_number}');
`);
    return user;
  } catch (error) {
    console.error("Error Creating user: ", error);
    throw error;
  }
};

export const showAllUsers = async () => {
  try {
    const allUsers = await db.sql(`
      SELECT * FROM users
      `);
    return allUsers;
  } catch (error) {
    console.error("Error retrieving users: ", error);
    throw error;
  }
};
