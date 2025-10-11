import express from "express";
import * as controller from "../controllers/projectResource.controller.js";

const router = express.Router();

// 📚 Get resources of a project
router.get("/project/:project_id", controller.getByProject);

// 📂 Get projects that contain a resource
router.get("/resource/:resource_id", controller.getByResource);

// 🔗 Link new resource to project
router.post("/link", controller.link);

// ❌ Unlink resource
router.delete("/:project_id/:resource_id", controller.unlink);

export default router;