import express from "express";
import { ResourceController } from "../controllers/resource.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

//
// 🔓 Public Routes (accessible without login)
//
router.get("/", ResourceController.getAll); // Get all resources
router.get("/:id", ResourceController.getById); // Get by ID
router.get("/slug/:slug", ResourceController.getBySlug); // Get by slug

// Analytics tracking (public)
router.patch("/:id/view", ResourceController.incrementViews); // Increment view count
router.patch("/:id/download", ResourceController.incrementDownloads); // Increment download count

//
// 🔒 Protected Routes (Admin + Marketing)
//
router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "marketing"),
  ResourceController.create
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "marketing"),
  ResourceController.update
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  ResourceController.delete
);

export default router;
