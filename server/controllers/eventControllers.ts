import * as dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

import Event from "../models/eventModel";

async function addEvent(req: Request, res: Response) {
    const { event, type, date } = req.body;
    let foundEvent;
    try {
        foundEvent = await Event.find({ event, type, date });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    if (foundEvent) {
        return res.status(409).json({
            message: "Duplicate events not allowed",
        });
    } else {
        const newEvent = new Event({
            event: event,
            type: type,
            date: date,
        });

        try {
            await newEvent.save();
            res.send(newEvent);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
}

export { addEvent };
