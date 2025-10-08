import express from "express";
import { ContactController } from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", ContactController.getAll);
router.get("/:id", ContactController.getById);
router.post("/", ContactController.create);
router.put("/:id", ContactController.update);
router.delete("/:id", ContactController.delete);

export default router;
