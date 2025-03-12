import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import { createUserController } from "./controllers/userController.mjs";
import { Database } from "@sqlitecloud/drivers";

dotenv.config();
const PORT = process.env.PORT || 4035;
const SQL_DRIVE = process.env.SQL_DRIVE;

const db = new Database(SQL_DRIVE);
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
  const { email, password_hash, first_name, last_name, phone_number } =
    req.body;
  const result = await db.sql(`
INSERT INTO users (email, password_hash, first_name, last_name, phone_number)
VALUES ('${email}', '${password_hash}', '${first_name}', '${last_name}', '${phone_number}');
`);
  console.log(result);
  res.sendStatus(200);
});
app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
