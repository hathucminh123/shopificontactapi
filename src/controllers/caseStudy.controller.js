import { CaseStudyService } from "../services/caseStudy.service.js";

export const CaseStudyController = {
  async getAll(req, res) {
    try {
      const caseStudies = await CaseStudyService.getAll();
      res.json({
        success: true,
        message: "Fetched all case studies",
        data: caseStudies,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const caseStudy = await CaseStudyService.getById(req.params.id);
      if (!caseStudy)
        return res.status(404).json({ success: false, error: "Case study not found" });
      res.json({ success: true, data: caseStudy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getBySlug(req, res) {
    try {
      const caseStudy = await CaseStudyService.getBySlug(req.params.slug);
      if (!caseStudy)
        return res.status(404).json({ success: false, error: "Case study not found" });
      res.json({ success: true, data: caseStudy });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newCaseStudy = await CaseStudyService.create(req.body);
      res.status(201).json({
        success: true,
        message: "Case study created successfully",
        data: newCaseStudy,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await CaseStudyService.update(req.params.id, req.body);
      res.json({
        success: true,
        message: "Case study updated successfully",
        data: updated,
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await CaseStudyService.delete(req.params.id);
      res.json({ success: true, message: result.message });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
