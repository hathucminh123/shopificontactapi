import ChatSession  from "../models/chat_sessions.model.js";
import  ChatMessage  from "../models/chat_messages.model.js";

export const ChatService = {
  // 🧾 Bắt đầu 1 phiên chat mới
  async startSession({ contact_name, contact_email, user_id }) {
    const session = await ChatSession.create({
      contact_name,
      contact_email,
      user_id: user_id || null,
      chat_type: "support",
      status: "open",
    });
    return session;
  },

  // 📜 Lấy tất cả chat sessions
  async getAllSessions() {
    return ChatSession.findAll({
      order: [["updated_at", "DESC"]],
    });
  },

  // 🔍 Lấy session theo ID
  async getSessionById(id) {
    return ChatSession.findByPk(id);
  },

  // 💬 Lưu tin nhắn
  async sendMessage({ chat_id, sender_type, sender_id, message, attachments }) {
    const msg = await ChatMessage.create({
      chat_id,
      sender_type,
      sender_id,
      message,
      attachments: attachments || null,
      is_read: false,
      sent_at: new Date(),
    });

    // cập nhật last_message cho session
    await ChatSession.update(
      { last_message: message, updatedAt: new Date() },
      { where: { id: chat_id } }
    );

    return msg;
  },

  // 🧩 Lấy tin nhắn theo chat_id
  async getMessages(chat_id) {
    return ChatMessage.findAll({
      where: { chat_id },
      order: [["sent_at", "ASC"]],
    });
  },

  // 🚫 Đóng chat session
  async closeSession(id) {
    await ChatSession.update(
      { status: "closed", ended_at: new Date() },
      { where: { id } }
    );
    return { success: true };
  },
};
