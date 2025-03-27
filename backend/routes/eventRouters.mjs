import express from "express";
import { showAllEventsController, eventRegistrationController } from "../controllers/eventController.mjs";
import { authVerification } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/", showAllEventsController);
router.use(authVerification)
router.post("/registration", eventRegistrationController)

export default router;
