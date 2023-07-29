"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(email, subject, message) {
    // Nodemailer configuration
    const transporter = nodemailer_1.default.createTransport({
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
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
    return;
}
exports.sendEmail = sendEmail;
