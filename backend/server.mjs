import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import { showAllUsers } from "./models/userModel.mjs";
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
import { authVerification } from "./middlewares/authMiddleware.mjs";
import bcrypt from "bcrypt";

async function store(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

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
    cookie: { maxAge: 1000 * 60 * 15 }, // 15 minutes
  })
);

const USER = { email: "admin@gmail.com", password: "1234" };

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/", userRoutes);
app.use("/api/admin/", eventRoutes);
app.use(express.static(__dirname + "assets/"));
app.set("views", __dirname);
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "login.html"));
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const allUsers = await showAllUsers();
  const findUser = allUsers.find(
    (user) => user.email === email && user.password_hash === password
  );
  if (findUser) {
    req.session.isAuthenticated = true;
    res.send({ login: true });
  } else {
    res.send({ login: false });
  }
});

app.use(authVerification);
// test

// pages routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "home.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname + "events.html"));
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
