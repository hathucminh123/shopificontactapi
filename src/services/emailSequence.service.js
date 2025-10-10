import { Op } from "sequelize";
import EmailSequence from "../models/emailSequence.model.js";
import Contact from "../models/contact.model.js";

export const EmailSequenceService = {
  async getAll() {
    return await EmailSequence.findAll({
      include: { model: Contact, as: "contact" },
      order: [["id", "DESC"]],
    });
  },

  async getById(id) {
    return await EmailSequence.findByPk(id, {
      include: { model: Contact, as: "contact" },
    });
  },

  async create(data) {
    return await EmailSequence.create(data);
  },

  async update(id, data) {
    const seq = await EmailSequence.findByPk(id);
    if (!seq) throw new Error("Sequence not found");
    return await seq.update(data);
  },

  async delete(id) {
    const seq = await EmailSequence.findByPk(id);
    if (!seq) throw new Error("Sequence not found");
    await seq.destroy();
    return { message: "Sequence deleted successfully" };
  },

  async startSequence(contactId, sequenceType) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) throw new Error("Contact not found");

    const now = new Date();
    const schedules = [1, 3, 5].map((days, index) => ({
      contact_id: contactId,
      sequence_type: sequenceType,
      email_number: index + 1,
      status: "scheduled",
      scheduled_at: new Date(now.getTime() + days * 86400000),
    }));

    await EmailSequence.bulkCreate(schedules);
    return { message: `Email sequence '${sequenceType}' started`, schedules };
  },

  async getPendingEmails() {
    const now = new Date();
    return await EmailSequence.findAll({
      where: {
        status: "scheduled",
        scheduled_at: { [Op.lte]: now },
      },
      include: [{ model: Contact, as: "contact" }],
    });
  },

  async reschedule(id, newDate) {
    const seq = await EmailSequence.findByPk(id, { include: { model: Contact, as: "contact" } });
    if (!seq) throw new Error("Sequence not found");
    if (seq.status === "sent") throw new Error("Cannot reschedule a sent email");

    seq.scheduled_at = new Date(newDate);
    seq.status = "scheduled";
    seq.sent_at = null;
    seq.attempts = 0;
    await seq.save();

    console.log(`🔁 Rescheduled email #${seq.email_number} (${seq.sequence_type}) for ${seq.contact?.email}`);
    return { message: "Email sequence rescheduled successfully", sequence: seq };
  },
};
