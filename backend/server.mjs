import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRoutes.mjs";
import { Database } from "@sqlitecloud/drivers";

dotenv.config();
const PORT = process.env.PORT || 4035;
const SQL_DRIVE = process.env.SQL_DRIVE;

export const db = new Database(SQL_DRIVE);
const app = express();

app.use(express.json());
app.get("/", async (req, res) => {
  const result = await db.sql(`
  SELECT * FROM users
  `);
  console.log(result);
  res.sendStatus(200);
});

app.use("/api/auth", userRoutes);
app.use("/api/admin/", eventRoutes);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
