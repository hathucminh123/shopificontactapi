// src/services/mail.service.js
import { Resend } from "resend";

const REQUIRED_ENVS = ["RESEND_API_KEY", "TO_EMAIL"];
function assertEnv() {
  const missing = REQUIRED_ENVS.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing ENV(s): ${missing.join(", ")}`);
  }
}

export const sendMail = async (formData) => {
  assertEnv();

  const {
    name = "",
    email = "",
    company = "",
    projectType = "",
    budget = "",
    timeline = "",
    message = "",
  } = formData || {};

  // Dùng địa chỉ test mặc định nếu chưa verify domain
  const from = process.env.MAIL_FROM || "onboarding@resend.dev";
  const to = process.env.TO_EMAIL;

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
              <p><b>Message:</b><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
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

  try {
    const result = await resend.emails.send({
      from,                         // KHÔNG dùng Gmail; test = onboarding@resend.dev
      to,                           // có thể là string hoặc array
      subject: "New Contact Form Submission",
      html,
      reply_to: email || undefined, // tiện bấm Reply tới người gửi
    });

    console.log("[Resend] result:", JSON.stringify(result));

    if (result?.error) {
      // Đưa cả mã lỗi Resend ra log để dễ tra
      throw new Error(
        `Resend error: ${result.error?.message || "unknown"}${
          result.error?.name ? ` (${result.error.name})` : ""
        }`
      );
    }

    return { id: result?.data?.id || null };
  } catch (err) {
    console.error("[sendMail] error:", err);
    // ném tiếp để controller trả 5xx kèm message rõ ràng
    throw err;
  }
};
