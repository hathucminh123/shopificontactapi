import User from "../models/users.model.js";
import Role from "../models/role.model.js";

export const UserService = {
  async getAll() {
    return await User.findAll({
      include: { model: Role, as: "role", attributes: ["id", "name", "description"] },
    });
  },

  async getById(id) {
    return await User.findByPk(id, {
      attributes: ["id", "name", "email", "avatar_url", "status", "created_at"],
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });
  },

  async create(data) {
    return await User.create(data);
  },

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.update(data);
    return user;
  },

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return { message: "User deleted successfully" };
  },
};
