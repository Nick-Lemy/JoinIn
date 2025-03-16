import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRouters.mjs";
import { Database } from "@sqlitecloud/drivers";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
const __dirname = dirname(fileURLToPath(import.meta.url)) + "/../frontend/";

dotenv.config();
const PORT = process.env.PORT || 4035;
const SQL_DRIVE = process.env.SQL_DRIVE;

export const db = new Database(SQL_DRIVE);
const app = express();

const redisClient = createClient({
  username: "nick-lemy",
  password: "Uz_#8CcdE7JZ#ZR",
  socket: {
    host: "redis-18436.c245.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 18436,
  },
});

redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 15 }, // 15 minutes
  })
);

const USER = { email: "admin@gmail.com", password: "1234" };

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/admin/", eventRoutes);
app.use(express.static(__dirname));
app.set("views", __dirname);

// test
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === USER.email && password === USER.password) {
    req.session.isAuthenticated = true;
    res.send({ login: true });
  } else {
    res.send({ login: false });
  }
});

// pages routes
app.get("/", (req, res) => {
  console.log(req.session.isAuthenticated);
  if (req.session.isAuthenticated) {
    res.sendFile(path.join(__dirname + "home.html"));
  } else {
    res.redirect("/login");
  }
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "login.html"));
});
app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname + "events.html"));
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
