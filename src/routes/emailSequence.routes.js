import express from "express";
import { EmailSequenceController } from "../controllers/emailSequence.controller.js";

const router = express.Router();

router.get("/", EmailSequenceController.getAll);
router.get("/:id", EmailSequenceController.getById);
router.post("/", EmailSequenceController.create);
router.put("/:id", EmailSequenceController.update);
router.delete("/:id", EmailSequenceController.delete);

export default router;
