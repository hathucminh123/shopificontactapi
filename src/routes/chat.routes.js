import express from "express";
import { ChatController } from "../controllers/chat.controller.js";

const router = express.Router();

// 🧾 Chat session
router.post("/start", ChatController.startChat);
router.get("/", ChatController.getChats);
router.get("/:id", ChatController.getChatById);
router.put("/:id/close", ChatController.closeChat);

// 💬 Messages
router.post("/:id/message", ChatController.sendMessage);
router.get("/:id/messages", ChatController.getMessages);

export default router;
