// // src/controllers/contact.controller.js
// import { saveContact } from "../services/contact.service.js";
// import { sendMail } from "../services/mail.service.js";
// import { validateContact } from "../utils/validate.js";

// export const handleContactForm = async (req, res) => {
//   try {
//     const v = validateContact(req.body);
//     if (!v.ok) {
//       return res.status(400).json({ success: false, error: v.error });
//     }

//     await saveContact(v.data);       // có thể bỏ nếu không cần lưu
//     const mail = await sendMail(v.data);

//     return res.status(201).json({
//       success: true,
//       message: "Contact saved & email sent!",
//       mailId: mail.id,
//     });
//   } catch (error) {
//     // Log chi tiết để xem ở Vercel Functions logs
//     console.error("[contact] error:", error);
//     return res.status(502).json({
//       success: false,
//       error:
//         error?.message ||
//         "Email provider error (check RESEND_API_KEY / MAIL_FROM / Suppressions)",
//     });
//   }
// };

// src/controllers/contact.controller.js
import { saveContact } from "../services/contact.service.js";
import { sendMail } from "../services/mail.service.js";

export const handleContactForm = async (req, res) => {
  try {
    const data = req.body;

    // lưu DB
    await saveContact(data);

    // gửi mail
    await sendMail(data);

    res.json({ success: true, message: "Contact saved & email sent!" });
  } catch (error) {
    console.error("Error in contact:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

