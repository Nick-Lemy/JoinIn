import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import { createUserController } from "./controllers/userController.mjs";
import { Database } from "@sqlitecloud/drivers";
const db = new Database(
  "sqlitecloud://cmhnorvhnk.g2.sqlite.cloud:8860/database.sqlite?apikey=8dq4ojnRIegTIrykmIgu318hh7IAORNIeaL8k9ribSY"
);

dotenv.config();
const PORT = process.env.PORT || 4035;
const app = express();

app.use(express.json());
app.get("/", async (req, res) => {
  const result = await db.sql(`
  SELECT * FROM users
  `);
  console.log(result);
  res.sendStatus(200);
});
app.post("/", async (req, res) => {
  const result = await db.sql(`
INSERT INTO users (email, password_hash, first_name, last_name, phone_number)
VALUES ('nicklemykayiranga@gmail.com', '1234', 'Nick-Lemy', 'Kayiranga', '+250793246060');
`);
  console.log(result);
  res.sendStatus(200);
});
app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
