import mongoose from "mongoose";
import User from "./userModel";

const eventSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, required: true, ref: User },
        event: { type: String, required: true },
        type: { type: String, required: false },
        date: { type: Date, required: true },
        reminderDate: { type: Date, required: false },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
