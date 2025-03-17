import dotenv from "dotenv";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Database } from "@sqlitecloud/drivers";
import { createClient } from "redis";
import session from "express-session";
import { RedisStore } from "connect-redis";

dotenv.config();
export const envVariables = {
  PORT: process.env.PORT || 4035,
  SQL_DRIVE: process.env.SQL_DRIVE,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

export const __dirname = dirname(fileURLToPath(import.meta.url)) + "/../frontend/";
export const db = new Database(envVariables.SQL_DRIVE);

export const redisClient = createClient({
  username: envVariables.REDIS_USERNAME,
  password: envVariables.REDIS_PASSWORD,
  socket: {
    host: envVariables.REDIS_HOST,
    port: envVariables.REDIS_PORT,
  },
});
redisClient.connect().catch(console.error);

export const sessionHandler = session({
  store: new RedisStore({ client: redisClient }),
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 15 }, // 15 minutes
})


async function passwordHasher(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
