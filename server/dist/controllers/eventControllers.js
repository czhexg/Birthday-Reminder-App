"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.editEvent = exports.getAllEvents = exports.addEvent = void 0;
require("dotenv/config");
const eventModel_1 = __importDefault(require("../models/eventModel"));
function addEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, event, type, date, reminderDate } = req.body;
        let foundEvent;
        try {
            foundEvent = yield eventModel_1.default.findOne({ event, type, date });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        if (foundEvent) {
            return res.status(409).json({
                message: "Duplicate events not allowed",
            });
        }
        else {
            const newEvent = new eventModel_1.default({
                user: userId,
                event: event,
                type: type,
                date: date,
                reminderDate: reminderDate,
            });
            try {
                yield newEvent.save();
                res.send(newEvent);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal server error");
            }
        }
    });
}
exports.addEvent = addEvent;
function getAllEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.query.userId;
        let foundEvents;
        try {
            foundEvents = yield eventModel_1.default.find({ user: userId });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
        res.send(foundEvents);
    });
}
exports.getAllEvents = getAllEvents;
function editEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, event, type, date, reminderDate } = req.body;
        try {
            // Find and update a document
            const updatedEvent = yield eventModel_1.default.findOneAndUpdate({ _id: id }, // Condition to find the document
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
            }
            else {
                console.log("Event not found");
                res.status(404).send("Event not found");
            }
        }
        catch (error) {
            console.error("Error updating event:", error);
            res.status(500).send("Internal server error");
        }
    });
}
exports.editEvent = editEvent;
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        console.log(req.body);
        try {
            // Find and update a document
            const deletedEvent = yield eventModel_1.default.findOneAndDelete({ _id: id } // Condition to find the document
            );
            if (deletedEvent) {
                console.log("Event updated:", deletedEvent);
                res.send(deletedEvent);
            }
            else {
                console.log("Event not found");
                res.status(404).send("Event not found");
            }
        }
        catch (error) {
            console.error("Error deleting event:", error);
            res.status(500).send("Internal server error");
        }
    });
}
exports.deleteEvent = deleteEvent;
