// src/controllers/auth.controller.js
import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password, role_id } = req.body;
      const { user, token } = await AuthService.register({ name, email, password, role_id });

      res.status(201).json({
        message: "User registered successfully",
        user: { id: user.id, name: user.name, email: user.email, role_id: user.role_id },
        token,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role?.name,
        },
        token,
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};
