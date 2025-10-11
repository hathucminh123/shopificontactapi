import * as service from "../services/projectTeam.service.js";

// ➕ Add member
export const add = async (req, res) => {
  try {
    const member = await service.addMember(req.body);
    res.status(201).json({ message: "Member added to project", member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get members in a project
export const getByProject = async (req, res) => {
  try {
    const list = await service.getMembersByProject(req.params.project_id);
    res.json({members: list});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get projects of a user
export const getByUser = async (req, res) => {
  try {
    const list = await service.getProjectsByUser(req.params.user_id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update member role
export const updateRole = async (req, res) => {
  try {
    const member = await service.updateMemberRole(req.params.id, req.body.role);
    res.json({ message: "Member role updated", member });
  } catch (err) {
    const code = err.message.includes("not found") ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};

// ❌ Remove member
export const remove = async (req, res) => {
  try {
    await service.removeMember(req.params.id);
    res.status(204).send();
  } catch (err) {
    const code = err.message.includes("not found") ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};
