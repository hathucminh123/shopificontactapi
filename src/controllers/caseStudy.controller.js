import { CaseStudyService } from "../services/caseStudy.service.js";

export const CaseStudyController = {
  async getAll(req, res) {
    try {
      const caseStudies = await CaseStudyService.getAll();
      res.json({ message: "Fetched all case studies", caseStudies });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const caseStudy = await CaseStudyService.getById(req.params.id);
      if (!caseStudy) return res.status(404).json({ error: "Case study not found" });
      res.json(caseStudy);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newCaseStudy = await CaseStudyService.create(req.body);
      res.status(201).json(newCaseStudy);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await CaseStudyService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await CaseStudyService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
