import express from "express";
import {
    addEvent,
    deleteEvent,
    editEvent,
    getAllEvents,
} from "../controllers/eventControllers";

const router = express.Router();

router.get("/", getAllEvents);

router.post("/add", addEvent);

router.patch("/edit", editEvent);

router.delete("/delete", deleteEvent);

export default router;
