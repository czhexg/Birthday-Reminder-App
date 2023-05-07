import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        event: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
