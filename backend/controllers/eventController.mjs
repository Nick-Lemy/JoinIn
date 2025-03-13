import { showAllEvents } from "../models/eventModel.mjs";

export const showAllEventsController = async (req, res) => {
  try {
    const events = showAllEvents();
    res.status(200).send(events);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to show events", error: error.message });
  }
};
