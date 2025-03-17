import express from "express";
import { showAllEventsController } from "../controllers/eventController.mjs";
import { authVerification } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.use(authVerification)
router.get("/", showAllEventsController);

export default router;
