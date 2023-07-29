"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const eventSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, required: true, ref: userModel_1.default },
    event: { type: String, required: true },
    type: { type: String, required: false },
    date: { type: Date, required: true },
    reminderDate: { type: Date, required: false },
}, { timestamps: true });
const Event = mongoose_1.default.model("Event", eventSchema);
exports.default = Event;
