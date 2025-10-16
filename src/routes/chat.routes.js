import express from "express";
import { ChatController } from "../controllers/chat.controller.js";

const router = express.Router();

// 🧾 Lấy tất cả chat sessions (cho admin)
router.get("/", ChatController.getAllSessions);

// 🔍 Lấy chi tiết 1 session
router.get("/:id", ChatController.getSessionById);

// 🧾 Tạo session mới (client bắt đầu chat)
router.post("/start", ChatController.startSession);

// 💬 Gửi tin nhắn (nếu không dùng socket)
router.post("/:chatId/message", ChatController.sendMessage);

// 📜 Lấy tất cả tin nhắn trong 1 chat session
router.get("/:chatId/messages", ChatController.getMessages);

// 🚫 Đóng session
router.put("/:chatId/close", ChatController.closeSession);

export default router;
