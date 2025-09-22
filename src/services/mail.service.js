// src/services/mail.service.js
import { Resend } from "resend";

export const sendMail = async (formData) => {
  const { name, email, company, projectType, budget, timeline, message } = formData;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden;
               box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <thead>
          <tr>
            <td style="background-color:#0d6efd; padding:20px; color:#ffffff; text-align:center;">
              <h2 style="margin:0;">New Contact Form Submission</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:20px;">
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Name:</b> ${name}</p>
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Email:</b> ${email}</p>
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Company:</b> ${company || "-"}</p>
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Project Type:</b> ${projectType || "-"}</p>
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Budget:</b> ${budget || "-"}</p>
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Timeline:</b> ${timeline || "-"}</p>
              <p style="font-size:15px;color:#333;margin:0 0 10px;"><b>Message:</b><br/>${message}</p>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="background:#f8f9fa;padding:15px;text-align:center;font-size:13px;color:#666;">
              This email was generated automatically from your website contact form.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;

  await resend.emails.send({
    from: process.env.MAIL_FROM || "hathucminh456@gmail.com",
    to: process.env.TO_EMAIL || "sales@vsnr.com",
    subject: "New Contact Form Submission",
    html,
  });
};
