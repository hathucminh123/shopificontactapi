import CaseStudy from "../models/caseStudy.model.js";

export const CaseStudyService = {
  async getAll() {
    return CaseStudy.findAll({ include: ["author"] });
  },

  async getById(id) {
    return CaseStudy.findByPk(id, { include: ["author"] });
  },

  async create(data) {
    return CaseStudy.create(data);
  },

  async update(id, updates) {
    const item = await CaseStudy.findByPk(id);
    if (!item) throw new Error("Case study not found");
    return item.update(updates);
  },

  async delete(id) {
    const item = await CaseStudy.findByPk(id);
    if (!item) throw new Error("Case study not found");
    await item.destroy();
    return { message: "Case study deleted successfully" };
  },
};
