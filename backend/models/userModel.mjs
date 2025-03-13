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

// Remove user
// async (req, res) => {
//   const { email, password_hash, first_name, last_name, phone_number } =
//     req.body;
//   const result = await db.sql(`
// INSERT INTO users (email, password_hash, first_name, last_name, phone_number)
// VALUES ('${email}', '${password_hash}', '${first_name}', '${last_name}', '${phone_number}');
// `);
//   console.log(result);
//   res.sendStatus(200);
// };
