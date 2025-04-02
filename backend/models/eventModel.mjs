import { db } from "../config.mjs";

export const showAllEvents = async () => {
  try {
    const allEvents = await db.sql(`
        USE DATABASE database.sqlite; 
            SELECT * FROM events`);
    return allEvents;
  } catch (error) {
    // console.log(`Error while showing the events: ${error}`);
    throw error;
  }
};

export const eventRegistration = async (user_id, { event_id, volunteer_role_id, qr_code }) => {
   try {
    // console.log(user_id, event_id, volunteer_role_id, qr_code)
      const registration = await db.sql(`
  USE DATABASE database.sqlite; 
  INSERT INTO registrations (user_id, event_id,  qr_code, registered_at, checked_in)
  VALUES (${Number(user_id)}, ${Number(event_id)}, '${qr_code}', '${Date.now()}', '${'false'}');
  `);
      return registration;
    } catch (error) {
      console.error("Error Registering: ", error);
      throw error;
    }

}
