import express from "express";
import * as ctrl from "../controllers/project.controller.js";

const router = express.Router();

// CRUD
router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.get("/:idOrSlug", ctrl.getOne);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

// FULL DETAIL
router.get("/:idOrSlug/full", ctrl.getFull);

export default router;
