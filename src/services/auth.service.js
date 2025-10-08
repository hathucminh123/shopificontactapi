// src/services/auth.service.js
import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import Role from "../models/role.model.js";
import { generateToken } from "../utils/jwt.js";

export const AuthService = {
  async register(data) {
    const { name, email, password, role_id } = data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Email already registered");

    // ❌ remove manual hashing
    const user = await User.create({
      name,
      email,
      password_hash: password, // <-- Sequelize hook will hash this
      role_id: role_id || 2,
    });

    const token = generateToken({ id: user.id, role_id: user.role_id, name: user.name,email: user.email });
    return { user, token };
  },

  async login(email, password) {
    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: "role" },
    });

    if (!user) throw new Error("User not found");

    // ✅ use model's built-in password validator
    const isValid = await user.validatePassword(password);
    if (!isValid) throw new Error("Invalid credentials");

   const token = generateToken({ id: user.id, role_id: user.role_id, name: user.name,email: user.email, role: user.role.name });
    return { user, token };
  },
};
