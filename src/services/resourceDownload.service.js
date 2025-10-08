import ResourceDownload from "../models/resourceDownload.model.js";
import Contact from "../models/contact.model.js";

export const ResourceDownloadService = {
  async getAll() {
    return await ResourceDownload.findAll({
      include: { model: Contact, as: "contact" },
    });
  },

  async getById(id) {
    return await ResourceDownload.findByPk(id, {
      include: { model: Contact, as: "contact" },
    });
  },

  async create(data) {
    return await ResourceDownload.create(data);
  },

  async delete(id) {
    const record = await ResourceDownload.findByPk(id);
    if (!record) throw new Error("Download record not found");
    await record.destroy();
    return { message: "Download deleted successfully" };
  },
};
