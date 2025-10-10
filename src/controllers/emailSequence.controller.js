import { EmailSequenceService } from "../services/emailSequence.service.js";

export const EmailSequenceController = {
  async getAll(req, res) {
    try {
      const sequences = await EmailSequenceService.getAll();
      res.json({ message: "Email sequences fetched", sequences });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const seq = await EmailSequenceService.getById(req.params.id);
      if (!seq) return res.status(404).json({ error: "Not found" });
      res.json(seq);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const newSeq = await EmailSequenceService.create(req.body);
      res.status(201).json({ message: "Sequence created", sequence: newSeq });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await EmailSequenceService.update(req.params.id, req.body);
      res.json({ message: "Sequence updated", sequence: updated });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await EmailSequenceService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async startSequence(req, res) {
    try {
      const { contactId, sequenceType } = req.body;
      const result = await EmailSequenceService.startSequence(contactId, sequenceType);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async reschedule(req, res) {
    try {
      const { newDate } = req.body;
      const result = await EmailSequenceService.reschedule(req.params.id, newDate);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
