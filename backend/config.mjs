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

export const __dirname =
  dirname(fileURLToPath(import.meta.url)) + "/../frontend/";
  let db;

  async function connectToDatabase() {
    try {
      db = new Database(SQL_DRIVE);
      console.log('✅ Connected to SQLite Cloud');
      
      // Keep the connection alive
      setInterval(async () => {
        try {
          await db.sql('SELECT 1');  // Prevents idle disconnection
          console.log('🔄 Pinged SQLite Cloud to keep connection alive');
        } catch (err) {
          console.error('⚠️ SQLite Cloud Ping Failed:', err);
        }
      }, 60000); // Every 1 minute
  
      return db;
    } catch (err) {
      console.error('❌ Database connection failed. Retrying in 5 seconds...', err);
      connectToDatabase()
    }
  }
  
  // Start the connection
  connectToDatabase();
  
  export { db };

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
  console.error(error)
  redisClient.connect()

}

export const sessionHandler = session({
  store: new RedisStore({ client: redisClient }),
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 15},
});

export const passwordHasher = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verify = async (password, storedPassword) => {
  const passwordMatched = await bcrypt.compare(password, storedPassword);

  return passwordMatched
};
