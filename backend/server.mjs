import express from "express";
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
import { envVariables } from "./config.mjs";

const {
  PORT,
  SQL_DRIVE,
  REDIS_PASSWORD,
  REDIS_USERNAME,
  REDIS_HOST,
  REDIS_PORT,
} = envVariables;

const __dirname = dirname(fileURLToPath(import.meta.url)) + "/../frontend/";

export const db = new Database(SQL_DRIVE);
const app = express();

const redisClient = createClient({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 2 }, // 15 minutes
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
