import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4035;
console.log(PORT);

const app = express();

app.get("/", (req, res) => {
  res.send("Hey there!");
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT} http://localhost:${PORT}`);
});
