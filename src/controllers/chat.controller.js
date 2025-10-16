import { ChatService } from "../services/chat.service.js";

export const ChatController = {
  async getAllSessions(req, res) {
    try {
      const sessions = await ChatService.getAllSessions();
      res.json({ success: true, data: sessions });
    } catch (err) {
      console.error("❌ getAllSessions error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  async getSessionById(req, res) {
    try {
      const session = await ChatService.getSessionById(req.params.id);
      res.json({ success: true, data: session });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  async startSession(req, res) {
    try {
      const session = await ChatService.startSession(req.body);
      res.json(session);
    } catch (err) {
      res.status(500).json({ message: "Failed to start session" });
    }
  },

  async getMessages(req, res) {
    try {
      const msgs = await ChatService.getMessages(req.params.chatId);
      res.json({ success: true, data: msgs });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to load messages" });
    }
  },

  async sendMessage(req, res) {
    try {
      const msg = await ChatService.sendMessage({
        chat_id: req.params.chatId,
        ...req.body,
      });
      res.json({ success: true, data: msg });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to send message" });
    }
  },

  async closeSession(req, res) {
    try {
      await ChatService.closeSession(req.params.chatId);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to close chat" });
    }
  },
};
