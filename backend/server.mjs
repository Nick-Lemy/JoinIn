import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import {
  adminAuthVerification,
  authVerification,
} from "./middlewares/authMiddleware.mjs";
import { PORT } from "./config.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRouters.mjs";
import { __dirname } from "./config.mjs";
import { sessionHandler } from "./config.mjs";
import { showAllEvents } from "./models/eventModel.mjs";
import { feedback, registration_html, returnEvent } from "./htmls.mjs";
import { db } from "./config.mjs";

const app = express();

app.use(sessionHandler);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/auth/", userRoutes);
app.use("/api/events/", eventRoutes);
app.use(express.static(__dirname + "assets/"));
app.set("views", __dirname);

app.get("/register", (req, res) => {
  if (req.session.isRegistered === true) return res.redirect("/login");
  return res.sendFile(path.join(__dirname + "register.html"));
});
app.get("/login", (req, res) => {
  if (req.session.isAuthenticated) return res.redirect("/");
  return res.sendFile(path.join(__dirname + "login.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    return res.redirect("/");
  });
});

app.use(authVerification);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "home.html"));
});
app.get("/events", (req, res) => {
  return res.sendFile(path.join(__dirname + "events.html"));
});

app.get("/account", (req, res) => {
  return res.sendFile(path.join(__dirname + "account.html"));
});

app.get("/registrations", adminAuthVerification, async (req, res) => {
  try {
    const eventsRegistred = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM registrations;`);

    const data = [];
    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      Array.from(eventsRegistred).map(async (registration) => {
        // console.log(registration.user_id);
        const [event] = await db.sql(`
        USE DATABASE database.sqlite; 
        SELECT * FROM events WHERE id = '${registration.event_id}';`);
        const [user] = await db.sql(`
          USE DATABASE database.sqlite; 
          SELECT * FROM users WHERE id = '${registration["user_id"]}';`);
        const { date, qr_code, registered_at, checked_in } = registration;
        data.push({
          username: user.first_name + " " + user.last_name,
          email: user.email,
          event_name: event.title,
          registered_at,
          qr_code,
          checked_in,
        });
      })
    );
    // data = data.sort((a, b)=>a.registered_at - b.registered_at)
    return res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred");
  }
});

app.get("/feedbacks", adminAuthVerification, async (req, res) => {
  const feedbacks = await db.sql(`
    USE DATABASE database.sqlite; 
    SELECT * FROM feedback;
    `);
  const data = [];
  await Promise.all(
    Array.from(feedbacks).map(async (feedback) => {
      // console.log(registration.user_id);
      console.log(feedback)
      const [registration] = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM registrations WHERE id = '${feedback.registration_id}';
      `);
      const [event] = await db.sql(`
        USE DATABASE database.sqlite; 
        SELECT * FROM events WHERE id = '${registration.event_id}';
        `);
      const [user] = await db.sql(`
        USE DATABASE database.sqlite; 
        SELECT * FROM users WHERE id = '${registration.user_id}';
        `);
      const { rating, comments, submitted_at } = feedback
      data.push({
        username: user.first_name + " " + user.last_name,
        email: user.email,
        event_name: event.title,
        submitted_at,
        rating,
        comments,
      });
    })
  );
  return res.send(data)
});

app.post("/feedback/:event_name", async (req, res) => {
  const { rating, comment } = req.body;
  const { event_name } = req.params;
  const allEvents = await showAllEvents();
  const event = await allEvents.find((event) => event.title === event_name);
  console.log(event);
  const qr = `JoinIn-${event.id}-${314 * Number(req.session.user.id)}`;
  const [registration] = await db.sql(`
    USE DATABASE database.sqlite; 
    SELECT * FROM registrations WHERE qr_code = '${qr}';
    `);
  const { id } = registration;
  const feedback = await db.sql(`
    USE DATABASE database.sqlite; 
    INSERT INTO feedback (registration_id, rating, comments, submitted_at)
    VALUES ('${id}', '${rating}', '${comment}', '${Date.now()}');
  `);
  return res.send(feedback);
});

app.get("/feedback/:event_name", async (req, res) => {
  const { event_name } = req.params;
  const allEvents = await showAllEvents();
  const event = await allEvents.find((event) => event.title === event_name);
  const qr = `JoinIn-${event.id}-${314 * Number(req.session.user.id)}`;
  return res.send(feedback(event_name, qr));
});

app.patch("/registration/:qr", adminAuthVerification, async (req, res) => {
  const { qr } = req.params;
  // console.log(qr);
  try {
    const registration = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM registrations WHERE qr_code = '${qr}';
      `);
    // console.log(registration);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await db.sql(`
      USE DATABASE database.sqlite; 
      UPDATE registrations SET checked_in = 'true' WHERE qr_code = '${qr}';
      `);

    res.json({ message: "Check-in successful", registration });
  } catch (error) {
    console.error("Error during check-in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/registration/:qr", adminAuthVerification, async (req, res) => {
  const { qr } = req.params;
  const registrations = await db.sql(`
  USE DATABASE database.sqlite; 
  SELECT * FROM registrations
        `);
  const findRegistration = registrations.find((reg) => reg.qr_code === qr);
  // console.log(findRegistration);
  if (typeof findRegistration !== "undefined") {
    const allUsers = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM users
      `);

    const findUser = allUsers.find(
      (user) => user.id === findRegistration.user_id
    );
    const allEvents = await showAllEvents();
    const findEvent = allEvents.find(
      (event) => event.id === findRegistration.event_id
    );

    return res.send(
      registration_html(
        findEvent.title,
        findRegistration.registered_at,
        `${findUser.first_name} ${findUser.last_name}`,
        findUser.email,
        findRegistration.checked_in,
        qr
      )
    );
  } else if (findRegistration.checked_in === "true") {
    return res.send(`Already Registered!`);
  } else return res.status(404).send(`<h3>Registration not found!</h3>`);
});

app.delete("/admin/event/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const deleteEvent = await db.sql(
      `
      USE DATABASE database.sqlite; 
      DELETE FROM events WHERE title = '${title}';
    `
    );
    return res.send(deleteEvent);
  } catch (error) {
    console.error(error);
    return res.send({ error });
  }
});

app.post("/admin/event", adminAuthVerification, async (req, res) => {
  const { title, description, image_link, date, location, max_attendees } =
    req.body;

  try {
    const result = await db.sql(`
      USE DATABASE database.sqlite; 
      INSERT INTO events (title, description, image_link, date, location, max_attendees, organizer_id)
      VALUES ('${title}', '${description}', '${
      image_link || ""
    }', '${date}', '${location}', ${max_attendees || "NULL"}, ${
      req.session.user.id
    });
    `);

    // Get the newly created event
    const newEvent = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM events WHERE id = last_insert_rowid();
    `);

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  const allEvents = await showAllEvents();

  const event = allEvents.find((event) => event.id === Number(id));
  const { title, location, image_link, date, max_attendees, description } =
    event;
  const user = req.session.user;
  return res.send(
    returnEvent(
      id,
      title,
      image_link,
      "undefined",
      date,
      location,
      max_attendees,
      description,
      user
    )
  );
});

app.get("/registrations/all", async (req, res) => {
  try {
    const eventsRegistred = await db.sql(`
      USE DATABASE database.sqlite; 
      SELECT * FROM registrations WHERE user_id = ${req.session.user.id};`);

    const data = [];
    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      Array.from(eventsRegistred).map(async (registration) => {
        const [event] = await db.sql(`
        USE DATABASE database.sqlite; 
        SELECT * FROM events WHERE id = '${registration.event_id}';`);
        const { date, qr_code, registered_at } = registration;
        data.push({
          event_name: event.title,
          registered_at,
          qr_code,
        });
      })
    );
    // data = data.sort((a, b)=>a.registered_at - b.registered_at)
    return res.send([
      data,
      {
        username:
          req.session.user.first_name + " " + req.session.user.last_name,
      },
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred");
  }
});

// Admin

app.get("/admin", adminAuthVerification, async (req, res) => {
  return res.sendFile(path.join(__dirname + "admin_dashbord.html"));
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
