const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const emailer = async ({ to, subject, text, html }) => {
  if (!to)
    throw new Error("Emailer needs recipient email. `to` parameter is missing");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
    html,
  });
};

module.exports = emailer;
