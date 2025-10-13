import CaseStudy from "../models/caseStudy.model.js";
import User from "../models/users.model.js";

export const CaseStudyService = {
  async getAll() {
    return CaseStudy.findAll({
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: User, as: "approver", attributes: ["id", "name", "email"] },
      ],
      order: [["created_at", "DESC"]],
    });
  },

  async getById(id) {
    return CaseStudy.findByPk(id, {
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: User, as: "approver", attributes: ["id", "name", "email"] },
      ],
    });
  },

  async getBySlug(slug) {
    return CaseStudy.findOne({
      where: { slug },
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: User, as: "approver", attributes: ["id", "name", "email"] },
      ],
    });
  },

  async create(data) {
    return CaseStudy.create(data);
  },

  async update(id, updates) {
    const item = await CaseStudy.findByPk(id);
    if (!item) throw new Error("Case study not found");
    await item.update(updates);
    return item;
  },

  async delete(id) {
    const item = await CaseStudy.findByPk(id);
    if (!item) throw new Error("Case study not found");
    await item.destroy();
    return { message: "Case study deleted successfully" };
  },
};
