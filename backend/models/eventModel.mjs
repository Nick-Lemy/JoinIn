import { Event } from "../config/db.mjs";
import { db } from "../server.mjs";

// // Create a user
// export const createEvent = async (eventInfo) => {
//   try {
//     const { email, password_hash, first_name, last_name, phone_number } =
//       userInfo;
//     const user = await db.sql(`
// INSERT INTO users (email, password_hash, first_name, last_name, phone_number)
// VALUES ('${email}', '${password_hash}', '${first_name}', '${last_name}', '${phone_number}');
// `);
//     return user;
//   } catch (error) {
//     console.error("Error Creating user: ", error);
//     throw error;
//   }
// };

export const showAllEvents = async () => {
  try {
    const allEvents = await db.sql(`
            SELECT * FROM events`);
    return allEvents;
  } catch (error) {
    console.log(`Error while showing the events: ${error}`);
    throw error;
  }
};
