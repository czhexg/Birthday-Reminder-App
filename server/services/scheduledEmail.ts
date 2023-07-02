import cron from "node-cron";
import { sendEmail } from "./emailService";
import Event from "../models/eventModel";

// Schedule this task to run every day at midnight (0:00)
function scheduledEmail() {
    cron.schedule("0 0 * * *", async () => {
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

        const eventReminders = await Event.find({
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

        let userMap: {
            [username: string]: {
                userEmail: string;
                events: {
                    event: string;
                    type: string;
                    date: Date;
                }[];
            };
        } = {};

        for (const reminder of eventReminders) {
            if (
                reminder.type == "Birthday" &&
                reminder.date >= prevDay &&
                reminder.date < currentDate
            ) {
                console.log("reminder");

                console.log(reminder);

                let nextYear = new Date();
                nextYear.setHours(0, 0, 0, 0);
                nextYear.setFullYear(prevDay.getFullYear() + 1);

                reminder.date = nextYear;
                reminder.save();
                continue;
            }

            let user: { username: string; email: string } = reminder.user as {
                username: string;
                email: string;
            };

            let reminderEvent = {
                event: reminder.event,
                type: reminder.type,
                date: reminder.date,
            };

            if (userMap.hasOwnProperty(user.username)) {
                userMap[user.username].events.push(reminderEvent);
            } else {
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
                message += `Event ${i + 1}: ${event.event}\nType: ${
                    event.type
                }\nDate: ${event.date}\n\n`;
            }

            message += "Best Regards,\nRemindify";

            try {
                sendEmail(
                    userMap[username].userEmail,
                    "Events Reminder",
                    message
                );
            } catch (error) {
                console.error(error);
            }
        }
    });
}

export default scheduledEmail;
