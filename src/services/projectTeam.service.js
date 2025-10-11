import ProjectTeam from "../models/projectTeam.model.js";
import User from "../models/users.model.js";
import Project from "../models/project.model.js";

// ➕ Thêm thành viên vào project
export const addMember = async (data) => {
  return await ProjectTeam.create(data);
};

// 📋 Lấy danh sách thành viên của project
export const getMembersByProject = async (projectId) => {
  return await ProjectTeam.findAll({
    where: { project_id: projectId },
    include: [
      { model: User, as: "user", attributes: ["id", "name", "email", "avatar_url"] },
      { model: Project, as: "project", attributes: ["id", "name", "slug"] },
    ],
  });
};

// 📋 Lấy danh sách dự án mà 1 user tham gia
export const getProjectsByUser = async (userId) => {
  return await ProjectTeam.findAll({
    where: { user_id: userId },
    include: [
      { model: Project, as: "project", attributes: ["id", "name", "slug"] },
      { model: User, as: "user", attributes: ["id", "name"] },
    ],
  });
};

// ✏️ Cập nhật vai trò (role)
export const updateMemberRole = async (id, role) => {
  const record = await ProjectTeam.findByPk(id);
  if (!record) throw new Error("Member not found in project");
  record.role = role;
  await record.save();
  return record;
};

// ❌ Xóa thành viên khỏi project
export const removeMember = async (id) => {
  const record = await ProjectTeam.findByPk(id);
  if (!record) throw new Error("Member not found");
  await record.destroy();
  return true;
};
