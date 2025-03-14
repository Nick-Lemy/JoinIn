import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.mjs";
import eventRoutes from "./routes/eventRouters.mjs";
import { Database } from "@sqlitecloud/drivers";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url)) + "/../frontend/";

dotenv.config();
const PORT = process.env.PORT || 4035;
const SQL_DRIVE = process.env.SQL_DRIVE;

export const db = new Database(SQL_DRIVE);
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/admin/", eventRoutes);
app.use(express.static(__dirname));
app.set("views", __dirname);

// pages routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "index.html"));
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
