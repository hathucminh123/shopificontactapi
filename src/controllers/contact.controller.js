import { ContactService } from "../services/contact.service.js";

export const ContactController = {
  // 🧩 Get all contacts (with related email sequences & downloads)
  async getAll(req, res) {
    try {
      const contacts = await ContactService.getAll();
      return res.status(200).json({
        message: "Contacts fetched successfully",
        contacts,
      });
    } catch (error) {
      console.error("❌ Error fetching contacts:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // 🔍 Get one contact by ID
  async getById(req, res) {
    try {
      const contact = await ContactService.getById(req.params.id);
      if (!contact)
        return res.status(404).json({ error: "Contact not found" });

      return res.status(200).json(contact);
    } catch (error) {
      console.error("❌ Error fetching contact:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // ✉️ Create new contact & send email notification
  async create(req, res) {
    try {
      const { name, email, message } = req.body;

      // Basic validation (optional, improves DX)
      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ error: "Name, email, and message are required" });
      }

      const newContact = await ContactService.create(req.body);

      return res.status(201).json({
        message: "Contact form submitted successfully",
        contact: newContact,
      });
    } catch (error) {
      console.error("❌ Error creating contact:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // ✏️ Update contact info
  async update(req, res) {
    try {
      const updated = await ContactService.update(req.params.id, req.body);
      return res.status(200).json({
        message: "Contact updated successfully",
        contact: updated,
      });
    } catch (error) {
      console.error("❌ Error updating contact:", error);
      return res.status(400).json({ error: error.message });
    }
  },

  // 🗑️ Delete a contact
  async delete(req, res) {
    try {
      const result = await ContactService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      console.error("❌ Error deleting contact:", error);
      return res.status(400).json({ error: error.message });
    }
  },
};
