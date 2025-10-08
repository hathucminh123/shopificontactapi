import Role from "../models/role.model.js";

export const RoleService = {
  async getAll() {
    return await Role.findAll();
  },

  async getById(id) {
    return await Role.findByPk(id);
  },

  async create(data) {
    return await Role.create(data);
  },

  async update(id, data) {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role not found");
    await role.update(data);
    return role;
  },

  async delete(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role not found");
    await role.destroy();
    return { message: "Role deleted successfully" };
  },
};
