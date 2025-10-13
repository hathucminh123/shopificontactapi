import express from "express";
import { CaseStudyController } from "../controllers/caseStudy.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// 🔓 Public routes
router.get("/", CaseStudyController.getAll);
router.get("/:id", CaseStudyController.getById);
router.get("/slug/:slug", CaseStudyController.getBySlug);

// 🔐 Protected routes
router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "marketing"),
  CaseStudyController.create
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "marketing"),
  CaseStudyController.update
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  CaseStudyController.delete
);

export default router;
