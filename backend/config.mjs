import dotenv from "dotenv";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Database } from "@sqlitecloud/drivers";
import { createClient } from "redis";
import session from "express-session";
import { RedisStore } from "connect-redis";
import bcrypt from "bcrypt";

dotenv.config();

export const {
  PORT,
  SQL_DRIVE,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_DURATION,
} = process.env;

export const __dirname = dirname(fileURLToPath(import.meta.url)) + "/../frontend/";
export const db = new Database(SQL_DRIVE);

export const redisClient = createClient({
  socket: {
    keepAlive: true,
  },
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});
try {
  redisClient.connect();
} catch (error) {
  console.error(error);
  redisClient.connect();
}

export const sessionHandler = session({
  store: new RedisStore({ client: redisClient }),
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 15 },
});

export const passwordHasher = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verify = async (password, storedPassword) => {
  const passwordMatched = await bcrypt.compare(password, storedPassword);

  return passwordMatched;
};
