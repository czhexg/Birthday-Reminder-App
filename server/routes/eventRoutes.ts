import express from "express";
import { addEvent } from "../controllers/eventControllers";

const router = express.Router();

router.post("/add", addEvent);

export default router;
