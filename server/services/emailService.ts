import "dotenv/config";
import nodemailer from "nodemailer";

function sendEmail(email: string, subject: string, message: string) {
    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        pool: true,
        host: "mail.gmx.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMX_EMAIL,
            pass: process.env.GMX_PASSWORD,
        },
    });

    // Define the email options
    const mailOptions = {
        from: process.env.GMX_EMAIL,
        to: email,
        subject: subject,
        text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });

    return;
}

export { sendEmail };
