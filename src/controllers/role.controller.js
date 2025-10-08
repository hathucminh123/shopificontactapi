import { RoleService } from "../services/role.service.js";

export const RoleController = {
  async getAll(req, res) {
    try {
      const roles = await RoleService.getAll();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const role = await RoleService.getById(req.params.id);
      if (!role) return res.status(404).json({ error: "Role not found" });
      res.json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const role = await RoleService.create(req.body);
      res.status(201).json(role);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const role = await RoleService.update(req.params.id, req.body);
      res.json(role);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await RoleService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
