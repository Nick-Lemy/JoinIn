import express from "express";
import { showAllEventsController, eventRegistrationController } from "../controllers/eventController.mjs";
import { authVerification } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.use(authVerification)
router.get("/", showAllEventsController);
router.post("/registration", eventRegistrationController)

export default router;
