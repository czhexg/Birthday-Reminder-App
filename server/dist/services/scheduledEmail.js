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
const node_cron_1 = __importDefault(require("node-cron"));
const emailService_1 = require("./emailService");
const eventModel_1 = __importDefault(require("../models/eventModel"));
// Schedule this task to run every day at midnight (0:00)
function scheduledEmail() {
    node_cron_1.default.schedule("0 0 * * *", () => __awaiter(this, void 0, void 0, function* () {
        console.log("cron job");
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        const prevDay = new Date();
        prevDay.setDate(prevDay.getDate() - 1);
        prevDay.setHours(0, 0, 0, 0);
        const twoDaysLater = new Date();
        twoDaysLater.setDate(twoDaysLater.getDate() + 2);
        twoDaysLater.setHours(0, 0, 0, 0);
        const eventReminders = yield eventModel_1.default.find({
            $or: [
                {
                    reminderDate: {
                        $gte: currentDate,
                        $lt: nextDay,
                    },
                },
                {
                    date: {
                        $gte: nextDay,
                        $lt: twoDaysLater,
                    },
                },
                {
                    date: {
                        $gte: prevDay,
                        $lt: currentDate,
                    },
                },
            ],
        }).populate("user", "username email");
        // make user hashmap (key should be the username. and value should be object with email and array of events)
        // loop through the reminders and store each event witht he same user into the same key
        // loop through the keys of the hashmap and send 1 email to each user
        let userMap = {};
        for (const reminder of eventReminders) {
            if (reminder.type == "Birthday" &&
                reminder.date >= prevDay &&
                reminder.date < currentDate) {
                console.log("reminder");
                console.log(reminder);
                let nextYear = new Date();
                nextYear.setHours(0, 0, 0, 0);
                nextYear.setFullYear(prevDay.getFullYear() + 1);
                reminder.date = nextYear;
                reminder.save();
                continue;
            }
            let user = reminder.user;
            let reminderEvent = {
                event: reminder.event,
                type: reminder.type,
                date: reminder.date,
            };
            if (userMap.hasOwnProperty(user.username)) {
                userMap[user.username].events.push(reminderEvent);
            }
            else {
                userMap[user.username] = {
                    userEmail: user.email,
                    events: [reminderEvent],
                };
            }
        }
        // send email to each user
        for (const username in userMap) {
            let events = userMap[username].events;
            let message = `Dear ${username},\n\nYou have ${events.length} upcoming events:\n\n`;
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                message += `Event ${i + 1}: ${event.event}\nType: ${event.type}\nDate: ${event.date}\n\n`;
            }
            message += "Best Regards,\nRemindify";
            try {
                (0, emailService_1.sendEmail)(userMap[username].userEmail, "Events Reminder", message);
            }
            catch (error) {
                console.error(error);
            }
        }
    }));
}
exports.default = scheduledEmail;
