import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        await transporter.sendMail({
            from: "MyJobs",
            to: to,
            subject,
            text,
            html,
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};