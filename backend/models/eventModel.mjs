import { db } from "../config.mjs";

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
