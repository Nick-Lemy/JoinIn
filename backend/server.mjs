import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { authVerification } from "./middlewares/authMiddleware.mjs";
import { PORT } from "./config.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRouters.mjs";
import { __dirname } from "./config.mjs";
import { sessionHandler } from "./config.mjs";
import { showAllEvents } from "./models/eventModel.mjs";
import { returnEvent } from "./htmls.mjs";

const app = express();

app.use(sessionHandler);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/auth/", userRoutes);
app.use("/api/events/", eventRoutes);
app.use(express.static(__dirname + "assets/"));
app.set("views", __dirname);

app.get("/register", (req, res) => {Auth
  if(req.session.isAuthenticated) return res.redirect('/')
  return res.sendFile(path.join(__dirname + "register.html"));
});
app.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname + "login.html"));
});

app.use(authVerification);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "home.html"));
});
app.get("/events", (req, res) => {
  return res.sendFile(path.join(__dirname + "events.html"));
});



app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  const allEvents = await showAllEvents();

  const event = allEvents.find(event=>event.id === Number(id))
  const { title, location, image_link, date, max_attendees, description } =
    event;
  return res.send(
    returnEvent(title, image_link, 'undefined', date, location, max_attendees, description)
  );
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
