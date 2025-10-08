import Contact from "../models/contact.model.js";
import EmailSequence from "../models/emailSequence.model.js";
import ResourceDownload from "../models/resourceDownload.model.js";
import { sendMail } from "./mail.service.js";

export const ContactService = {
  // 🔹 Get all contacts with relationships
  async getAll() {
    return await Contact.findAll({
      include: [
        { model: EmailSequence, as: "emailSequences" },
        { model: ResourceDownload, as: "downloads" },
      ],
      order: [["created_at", "DESC"]],
    });
  },

  // 🔹 Get a single contact by ID
  async getById(id) {
    return await Contact.findByPk(id, {
      include: [
        { model: EmailSequence, as: "emailSequences" },
        { model: ResourceDownload, as: "downloads" },
      ],
    });
  },

  // 🔹 Create new contact + send email notification
  async create(data) {
    const newContact = await Contact.create(data);

    // Only send email if environment variables are configured
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.TO_EMAIL) {
        await sendMail(data);
        console.log("📧 Contact email sent successfully");
      } else {
        console.warn("⚠️ Missing SMTP configuration — skipping email send");
      }
    } catch (error) {
      console.error("❌ Failed to send email:", error.message);
      // You might choose NOT to throw here, to still allow DB save success
    }

    return newContact;
  },

  // 🔹 Update contact
  async update(id, data) {
    const contact = await Contact.findByPk(id);
    if (!contact) throw new Error("Contact not found");

    await contact.update(data);
    return contact;
  },

  // 🔹 Delete contact
  async delete(id) {
    const contact = await Contact.findByPk(id);
    if (!contact) throw new Error("Contact not found");

    await contact.destroy();
    return { message: "Contact deleted successfully" };
  },
};
