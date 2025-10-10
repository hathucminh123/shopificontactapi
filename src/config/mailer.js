import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"VSNR" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};