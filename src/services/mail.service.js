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
              <p><b>Name:</b> ${name}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Company:</b> ${company || "-"}</p>
              <p><b>Project Type:</b> ${projectType || "-"}</p>
              <p><b>Budget:</b> ${budget || "-"}</p>
              <p><b>Timeline:</b> ${timeline || "-"}</p>
              <p><b>Message:</b><br/>${message}</p>
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

  const result = await resend.emails.send({
    from: process.env.MAIL_FROM || "onboarding@resend.dev",
    to: process.env.TO_EMAIL || "sales@vsnr.com",
    subject: "New Contact Form Submission",
    html,
  });

  console.log("[Resend] result:", result);

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }
};
