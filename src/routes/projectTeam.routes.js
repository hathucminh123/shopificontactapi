import express from "express";
import * as ctrl from "../controllers/projectTeam.controller.js";

const router = express.Router();

// ➕ Add member
router.post("/", ctrl.add);

// 📋 Get team by project
router.get("/project/:project_id", ctrl.getByProject);

// 📋 Get projects by user
router.get("/user/:user_id", ctrl.getByUser);

// ✏️ Update role
router.put("/:id/role", ctrl.updateRole);

// ❌ Remove member
router.delete("/:id", ctrl.remove);

export default router;
