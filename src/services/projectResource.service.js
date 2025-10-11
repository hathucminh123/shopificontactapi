import ProjectResource from "../models/projectResource.model.js";
import Project from "../models/project.model.js";
import Resource from "../models/resource.model.js";

/* ===========================================================
   🔗 Link Resource to Project
   =========================================================== */
export const linkResource = async (data) => {
  // Tránh duplicate
  const exists = await ProjectResource.findOne({
    where: {
      project_id: data.project_id,
      resource_id: data.resource_id,
    },
  });

  if (exists) throw new Error("Resource already linked to project");
  return await ProjectResource.create(data);
};

/* ===========================================================
   📚 Get All Resources Linked to a Project
   =========================================================== */
export const getResourcesByProject = async (projectId) => {
  // ✅ Cách 1 (đề xuất): Trả về đầy đủ project + resources
  const project = await Project.findByPk(projectId, {
    include: [
      {
        model: Resource,
        as: "resources",
        through: { attributes: ["id", "linked_at"] }, // Lấy thêm thông tin bảng trung gian
      },
    ],
  });

  if (!project) throw new Error("Project not found");
  return { data: project };
};

/* ===========================================================
   📂 Get All Projects that Contain a Resource
   =========================================================== */
export const getProjectsByResource = async (resourceId) => {
  const resource = await Resource.findByPk(resourceId, {
    include: [
      {
        model: Project,
        as: "projects",
        through: { attributes: ["id", "linked_at"] },
      },
    ],
  });

  if (!resource) throw new Error("Resource not found");
  return { data: resource };
};

/* ===========================================================
   ❌ Unlink Resource from Project
   =========================================================== */
export const unlinkResource = async (projectId, resourceId) => {
  const link = await ProjectResource.findOne({
    where: { project_id: projectId, resource_id: resourceId },
  });

  if (!link) throw new Error("Resource not linked to project");
  await link.destroy();
  return true;
};
