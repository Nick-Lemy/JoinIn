import express from "express";
import { showAllEventsController } from "../controllers/eventController.mjs";

const router = express.Router();

router.get("/events", showAllEventsController);

export default router;
