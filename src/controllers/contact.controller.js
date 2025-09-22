import { validateContact } from "../utils/validate.js";
import { saveContact } from "../services/contact.service.js";
import { sendMail } from "../services/mail.service.js";

export const handleContactForm = async (req, res) => {
  try {
    const parsed = validateContact(req.body);
    if (!parsed.ok) {
      return res.status(400).json({ success: false, error: parsed.error });
    }
    const data = parsed.data;

    try {
      await saveContact(data); // nếu chưa config DB, hàm có thể no-op
    } catch (dbErr) {
      console.error("[contact] DB error:", dbErr);
      // vẫn tiếp tục gửi email
    }

    await sendMail(data);

    return res.status(201).json({ success: true, message: "Contact saved & email sent!" });
  } catch (error) {
    console.error("Error in contact:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
