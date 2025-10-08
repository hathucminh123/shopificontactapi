import Resource from "../models/resource.model.js";

export const ResourceService = {
  // 🔹 Get all resources
  async getAll() {
    return await Resource.findAll({ order: [["created_at", "DESC"]] });
  },

  // 🔹 Get one resource by ID
  async getById(id) {
    return await Resource.findByPk(id);
  },

  // 🔹 Get one resource by slug
  async getBySlug(slug) {
    return await Resource.findOne({ where: { slug } });
  },

  // 🔹 Create new resource
  async create(payload) {
    return await Resource.create(payload);
  },

  // 🔹 Update resource
  async update(id, payload) {
    const resource = await Resource.findByPk(id);
    if (!resource) return null;
    await resource.update(payload);
    return resource;
  },

  // 🔹 Delete resource
  async delete(id) {
    const resource = await Resource.findByPk(id);
    if (!resource) return null;
    await resource.destroy();
    return resource;
  },

  // 🔹 Increment views count
  async incrementViews(id) {
    const resource = await Resource.findByPk(id);
    if (!resource) return null;
    resource.views += 1;
    await resource.save();
    return resource;
  },

  // 🔹 Increment downloads count
  async incrementDownloads(id) {
    const resource = await Resource.findByPk(id);
    if (!resource) return null;
    resource.downloads += 1;
    await resource.save();
    return resource;
  },
};
