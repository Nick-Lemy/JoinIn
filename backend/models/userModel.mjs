import { db } from "../config.mjs";

// Create a user
export const userRegister = async (userInfo) => {
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

export const userLogin = async ({email, password_hash}) => {
  try {
    const allUsers = await db.sql(`
      SELECT * FROM users
      `);
    const findUser = allUsers.find(
        (user) => user.email === email && user.password_hash === password_hash
    );
    return findUser
  } catch (error) {
    console.error("Error retrieving users: ", error);
    throw error;
  }
};
