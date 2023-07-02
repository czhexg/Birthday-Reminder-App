import "dotenv/config";
import { Request, Response } from "express";

import Event from "../models/eventModel";

async function addEvent(req: Request, res: Response) {
    const { userId, event, type, date, reminderDate } = req.body;

    let foundEvent;
    try {
        foundEvent = await Event.findOne({ event, type, date });
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
            user: userId,
            event: event,
            type: type,
            date: date,
            reminderDate: reminderDate,
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

async function getAllEvents(req: Request, res: Response) {
    let userId = req.query.userId;

    let foundEvents;
    try {
        foundEvents = await Event.find({ user: userId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    res.send(foundEvents);
}

async function editEvent(req: Request, res: Response) {
    const { id, event, type, date, reminderDate } = req.body;

    try {
        // Find and update a document
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: id }, // Condition to find the document
            {
                event: event,
                type: type,
                date: date,
                reminderDate: reminderDate,
            }, // Update the properties
            { new: true } // Return the updated document
        );

        if (updatedEvent) {
            console.log("Event updated:", updatedEvent);
            res.send(updatedEvent);
        } else {
            console.log("Event not found");
            res.status(404).send("Event not found");
        }
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).send("Internal server error");
    }
}

async function deleteEvent(req: Request, res: Response) {
    const { id } = req.body;

    console.log(req.body);

    try {
        // Find and update a document
        const deletedEvent = await Event.findOneAndDelete(
            { _id: id } // Condition to find the document
        );

        if (deletedEvent) {
            console.log("Event updated:", deletedEvent);
            res.send(deletedEvent);
        } else {
            console.log("Event not found");
            res.status(404).send("Event not found");
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).send("Internal server error");
    }
}

export { addEvent, getAllEvents, editEvent, deleteEvent };
