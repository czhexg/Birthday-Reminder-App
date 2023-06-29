import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, required: true },
        event: { type: String, required: true },
        type: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
