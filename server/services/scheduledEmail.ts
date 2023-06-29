import cron from "node-cron";
import { sendEmail } from "./emailService";

cron.schedule("0 0 * * *", () => {
    // Schedule this task to run every day at midnight (0:00)
    // find all events that fulfil condition
    // get email of users
    // send email to each user
    const email = "recipient@example.com";
    const subject = "Scheduled Email";
    const message =
        "This is a scheduled email sent using Node-cron and Nodemailer.";

    // Call the sendEmail function from emailService.js
    sendEmail(email, subject, message);
});
