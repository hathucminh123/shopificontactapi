import { ChatService } from "../services/chat.service.js";

export const ChatController = {
  async startChat(req, res) {
    try {
      const chat = await ChatService.createSession(req.body);
      res.json(chat);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to start chat" });
    }
  },

  async getChats(req, res) {
    try {
      const chats = await ChatService.getAllSessions();
      res.json(chats);
    } catch (err) {
      res.status(500).json({ error: "Error fetching chats" });
    }
  },

  async getChatById(req, res) {
    try {
      const chat = await ChatService.getSessionById(req.params.id);
      if (!chat) return res.status(404).json({ error: "Chat not found" });
      res.json(chat);
    } catch (err) {
      res.status(500).json({ error: "Error fetching chat" });
    }
  },

  async sendMessage(req, res) {
    try {
      const msg = await ChatService.sendMessage({
        chat_id: req.params.id,
        ...req.body,
      });
      res.json(msg);
    } catch (err) {
      res.status(500).json({ error: "Failed to send message" });
    }
  },

  async getMessages(req, res) {
    try {
      const msgs = await ChatService.getMessages(req.params.id);
      res.json(msgs);
    } catch (err) {
      res.status(500).json({ error: "Error fetching messages" });
    }
  },

  async closeChat(req, res) {
    try {
      const result = await ChatService.closeSession(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to close chat" });
    }
  },
};
