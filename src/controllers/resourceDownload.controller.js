import { ResourceDownloadService } from "../services/resourceDownload.service.js";

export const ResourceDownloadController = {
  async getAll(req, res) {
    try {
      const downloads = await ResourceDownloadService.getAll();
      res.json({ message: "Downloads fetched", downloads });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const record = await ResourceDownloadService.getById(req.params.id);
      if (!record) return res.status(404).json({ error: "Not found" });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newDownload = await ResourceDownloadService.create(req.body);
      res.status(201).json({ message: "Download record created", download: newDownload });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await ResourceDownloadService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
