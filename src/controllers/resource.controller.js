import { ResourceService } from "../services/resource.service.js";

export const ResourceController = {
  // 🟢 Get all resources
  async getAll(req, res) {
    try {
      const resources = await ResourceService.getAll();
      res.json({ message: "Resources fetched successfully", resources });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Get resource by ID
  async getById(req, res) {
    try {
      const resource = await ResourceService.getById(req.params.id);
      if (!resource)
        return res.status(404).json({ message: "Resource not found" });
      res.json({ message: "Resource fetched successfully", resource });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Get resource by slug
  async getBySlug(req, res) {
    try {
      const resource = await ResourceService.getBySlug(req.params.slug);
      if (!resource)
        return res.status(404).json({ message: "Resource not found" });
      res.json({ message: "Resource fetched successfully", resource });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Create new resource
  async create(req, res) {
    try {
      const resource = await ResourceService.create(req.body);
      res
        .status(201)
        .json({ message: "Resource created successfully", resource });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Update resource
  async update(req, res) {
    try {
      const resource = await ResourceService.update(req.params.id, req.body);
      if (!resource)
        return res.status(404).json({ message: "Resource not found" });
      res.json({ message: "Resource updated successfully", resource });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Delete resource
  async delete(req, res) {
    try {
      const resource = await ResourceService.delete(req.params.id);
      if (!resource)
        return res.status(404).json({ message: "Resource not found" });
      res.json({ message: "Resource deleted successfully", resource });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Increment views
  async incrementViews(req, res) {
    try {
      const resource = await ResourceService.incrementViews(req.params.id);
      if (!resource)
        return res.status(404).json({ message: "Resource not found" });
      res.json({ message: "View count incremented", views: resource.views });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // 🟢 Increment downloads
  async incrementDownloads(req, res) {
    try {
      const resource = await ResourceService.incrementDownloads(req.params.id);
      if (!resource)
        return res.status(404).json({ message: "Resource not found" });
      res.json({
        message: "Download count incremented",
        downloads: resource.downloads,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
