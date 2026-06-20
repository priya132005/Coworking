// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: "no-reply@app.com",
    to,
    subject,
    text,
  });
};

export default sendEmail;
