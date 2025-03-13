import express from "express";
import { createUserController } from "../controllers/userController.mjs";

const router = express.Router();

router.post("/register", createUserController);

export default router;
