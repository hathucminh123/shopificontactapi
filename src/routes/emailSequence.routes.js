import express from "express";
import { EmailSequenceController } from "../controllers/emailSequence.controller.js";

const router = express.Router();

router.get("/", EmailSequenceController.getAll);
router.get("/:id", EmailSequenceController.getById);
router.post("/", EmailSequenceController.create);
router.put("/:id", EmailSequenceController.update);
router.put("/:id/reschedule", EmailSequenceController.reschedule);
router.delete("/:id", EmailSequenceController.delete);
router.post("/start", EmailSequenceController.startSequence);

export default router;
