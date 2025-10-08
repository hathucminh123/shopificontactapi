import EmailSequence from "../models/emailSequence.model.js";
import Contact from "../models/contact.model.js";

export const EmailSequenceService = {
  async getAll() {
    return await EmailSequence.findAll({
      include: { model: Contact, as: "contact" },
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
};
