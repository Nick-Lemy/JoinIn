import express from "express";
import { userRegisterController, userLoginController } from "../controllers/userController.mjs";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);

export default router;
