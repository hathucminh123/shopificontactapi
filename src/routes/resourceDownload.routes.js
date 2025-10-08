import express from "express";
import { ResourceDownloadController } from "../controllers/resourceDownload.controller.js";

const router = express.Router();

router.get("/", ResourceDownloadController.getAll);
router.get("/:id", ResourceDownloadController.getById);
router.post("/", ResourceDownloadController.create);
router.delete("/:id", ResourceDownloadController.delete);

export default router;
