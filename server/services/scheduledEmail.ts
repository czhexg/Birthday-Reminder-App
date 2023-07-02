import cron from "node-cron";
import { sendEmail } from "./emailService";
import Event from "../models/eventModel";

// Schedule this task to run every day at midnight (0:00)
function scheduledEmail() {
    cron.schedule("*/5 * * * * *", async () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);

        const eventReminders = await Event.find({
            $or: [
                {
                    reminderDate: {
                        $gte: currentDate,
                        $lte: nextDay,
                    },
                },
                {
                    date: {
                        $gte: currentDate,
                        $lte: nextDay,
                    },
                },
            ],
        }).populate("user", "username email");

        // make user hashmap (key should be the username. and value should be object with username and array of events)
        // loop through the reminders and store each event witht he same user into the same key
        // loop through the keys of the hashmap and send 1 email to each user

        let userMap = {};

        for (const reminder of eventReminders) {
            let user: { username: string; email: string } = reminder.user as {
                username: string;
                email: string;
            };
            let userEmail = user.email;
            console.log(reminder.user);
        }

        // send email to each user
        const email = "recipient@example.com";
        const subject = "Scheduled Email";
        const message =
            "This is a scheduled email sent using Node-cron and Nodemailer.";

        // Call the sendEmail function from emailService.js
        // sendEmail(email, subject, message);
    });
}

export default scheduledEmail;
