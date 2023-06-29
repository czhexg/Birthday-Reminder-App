import nodemailer from "nodemailer";

function sendEmail(email: string, subject: string, message: string) {
    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        // Configure your email service provider here
    });

    // Define the email options
    const mailOptions = {
        from: "your-email@example.com",
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
}

export { sendEmail };
