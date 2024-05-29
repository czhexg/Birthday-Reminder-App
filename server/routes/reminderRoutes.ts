import express from "express";
import { runScheduledEmailTask } from "../controllers/scheduledEmailController";

const router = express.Router();

router.get("/", runScheduledEmailTask);

export default router;
