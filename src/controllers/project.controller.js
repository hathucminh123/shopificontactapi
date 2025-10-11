import * as service from "../services/project.service.js";
import { ensureSlug } from "../utils/slugify.js";

export const create = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.slug && body.name) body.slug = ensureSlug(body.name);

    if (!body.slug || !body.name || !body.author_id) {
      return res.status(400).json({ error: "slug, name, author_id are required" });
    }

    const project = await service.createProject(body);
    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const list = async (req, res) => {
  try {
    const projects = await service.listProjects(req.query);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const project = await service.getProject(req.params.idOrSlug);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const project = await service.updateProject(req.params.id, req.body);
    res.json({ message: "Project updated", project });
  } catch (err) {
    const code = err.message === "Project not found" ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await service.deleteProject(req.params.id);
    res.status(204).send();
  } catch (err) {
    const code = err.message === "Project not found" ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};

// 🟣 Full project detail
export const getFull = async (req, res) => {
  try {
    const project = await service.getFullProjectDetail(req.params.idOrSlug);
    res.json(project);
  } catch (err) {
    const code = err.message === "Project not found" ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};
