import Project from "../models/project.model.js";
import User from "../models/users.model.js";
import Contact from "../models/contact.model.js";
import CaseStudy from "../models/caseStudy.model.js";
import ProjectTask from "../models/projectTask.model.js";
import Resource from "../models/resource.model.js";

/**
 * 🟢 CREATE PROJECT
 */
export const createProject = async (payload) => {
  return await Project.create(payload);
};

/**
 * 🟢 LIST PROJECTS
 */
export const listProjects = async (query = {}) => {
  const where = {};
  if (query.status) where.status = query.status;
  if (query.author_id) where.author_id = query.author_id;

  return await Project.findAll({
    where,
    include: [
      { model: User, as: "author", attributes: ["id", "name", "email"] },
      { model: User, as: "approver", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "email", "company"] },
      { model: CaseStudy, as: "caseStudy", attributes: ["id", "title", "slug"] },
    ],
    order: [["created_at", "DESC"]],
  });
};

/**
 * 🟢 GET ONE PROJECT (by ID or slug)
 */
export const getProject = async (idOrSlug) => {
  const where = Number.isInteger(+idOrSlug) ? { id: +idOrSlug } : { slug: idOrSlug };
  return await Project.findOne({
    where,
    include: [
      { model: User, as: "author", attributes: ["id", "name", "email"] },
      { model: User, as: "approver", attributes: ["id", "name"] },
      { model: Contact, as: "contact", attributes: ["id", "name", "email", "company"] },
      { model: CaseStudy, as: "caseStudy", attributes: ["id", "title", "slug"] },
    ],
  });
};

/**
 * 🟢 UPDATE PROJECT
 */
export const updateProject = async (id, updates) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  await project.update(updates);
  return project;
};

/**
 * 🟢 DELETE PROJECT
 */
export const deleteProject = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) throw new Error("Project not found");
  await project.destroy();
  return true;
};

/**
 * 🟣 FULL PROJECT DETAIL
 */
export const getFullProjectDetail = async (idOrSlug) => {
  const where = Number.isInteger(+idOrSlug) ? { id: +idOrSlug } : { slug: idOrSlug };

  const project = await Project.findOne({
    where,
    include: [
      // 👤 Author & Approver
      { model: User, as: "author", attributes: ["id", "name", "email"] },
      { model: User, as: "approver", attributes: ["id", "name", "email"] },

      // ☎️ Contact info
      { model: Contact, as: "contact", attributes: ["id", "name", "email", "company"] },

      // 📘 Case study
      { model: CaseStudy, as: "caseStudy", attributes: ["id", "title", "slug"] },

      // ✅ Tasks
      {
        association: "tasks",
        attributes: ["id", "title", "status", "priority", "due_date"],
        include: [{ model: User, as: "assignee", attributes: ["id", "name", "email"] }],
      },

      // 👥 Team members
      {
        association: "teamMembers",
        through: { attributes: ["role", "joined_at"] },
        attributes: ["id", "name", "email"],
      },

      // 📚 Resources
      {
        association: "resources",
        attributes: ["id", "title", "category", "url"],
        through: { attributes: [] },
      },
    ],
  });

  if (!project) throw new Error("Project not found");
  return project;
};
