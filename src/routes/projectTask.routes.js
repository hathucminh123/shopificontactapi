import { Router } from "express";
import {
  getTasksByProject,
  postTask,
  putTask,
  removeTask,
  patchMoveTask,
} from "../controllers/projectTask.controller.js";

const router = Router();

router.get("/projects/:projectId/tasks", getTasksByProject);
router.post("/tasks", postTask);
router.put("/tasks/:id", putTask);
router.delete("/tasks/:id", removeTask);

// kéo thả: PATCH /tasks/:id/move
router.patch("/tasks/:id/move", patchMoveTask);

export default router;
