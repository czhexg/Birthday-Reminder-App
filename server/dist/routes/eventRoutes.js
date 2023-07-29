"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventControllers_1 = require("../controllers/eventControllers");
const router = express_1.default.Router();
router.get("/", eventControllers_1.getAllEvents);
router.post("/add", eventControllers_1.addEvent);
router.patch("/edit", eventControllers_1.editEvent);
router.delete("/delete", eventControllers_1.deleteEvent);
exports.default = router;
