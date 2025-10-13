import express from "express";
import { BlogPostController } from "../controllers/blogPost.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// 🔓 Public
router.get("/", BlogPostController.getAll);
router.get("/:id", BlogPostController.getById);
router.get("/slug/:slug", BlogPostController.getBySlug);
// 🔒 Protected (only Admin, Editor)
router.post("/", authMiddleware, allowRoles("admin", "editor"), BlogPostController.create);
router.put("/:id", authMiddleware, allowRoles("admin", "editor"), BlogPostController.update);
router.delete("/:id", authMiddleware, allowRoles("admin"), BlogPostController.delete);

export default router;
