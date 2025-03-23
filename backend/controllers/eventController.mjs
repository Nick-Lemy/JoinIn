import { showAllEvents, eventRegistration } from "../models/eventModel.mjs";

export const showAllEventsController = async (req, res) => {
  try {
    const events = await showAllEvents();
    return res.status(200).send(events);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to show events", error: error.message });
  }
};

export const checkOneEvent = async (req, res) => {
  try {
    const { name } = req.params
    const events = await showAllEvents();
    const theEvent = events.find(event=>event.name === id)
  } catch (error) {
    
  }
}

export const eventRegistrationController = async (req, res) =>{
  try {
    const registration = await eventRegistration(req.session.user['id'], req.body)
    console.log(registration)
    return res.status(201).send(registration)
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to register", error: error.message }); 
  }
}
