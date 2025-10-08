import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import Role from "../models/role.model.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: { model: Role, as: "role" },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token - user not found" });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name, // Example: 'admin', 'editor', 'marketing'
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalid or expired" });
  }
};
