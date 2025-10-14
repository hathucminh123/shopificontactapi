import ChatSession from "../models/chat_sessions.model.js";
import ChatMessage from "../models/chat_messages.model.js";

export const ChatService = {
  async createSession({ contact_id, user_id, chat_type }) {
    return await ChatSession.create({ contact_id, user_id, chat_type });
  },

  async getAllSessions() {
    return await ChatSession.findAll({
      order: [["updated_at", "DESC"]],
    });
  },

  async getSessionById(id) {
    return await ChatSession.findByPk(id, {
      include: [{ model: ChatMessage, as: "messages" }],
    });
  },

  async sendMessage({ chat_id, sender_type, sender_id, message, attachments }) {
    const msg = await ChatMessage.create({
      chat_id,
      sender_type,
      sender_id,
      message,
      attachments,
    });

    await ChatSession.update(
      { last_message: message, updated_at: new Date() },
      { where: { id: chat_id } }
    );

    return msg;
  },

  async getMessages(chat_id) {
    return await ChatMessage.findAll({
      where: { chat_id },
      order: [["sent_at", "ASC"]],
    });
  },

  async closeSession(chat_id) {
    await ChatSession.update(
      { status: "closed", ended_at: new Date() },
      { where: { id: chat_id } }
    );
    return { success: true };
  },
    async markMessagesAsRead(chat_id, message_ids) {
    if (!message_ids?.length) return;
    await ChatMessage.update(
      { is_read: true },
      { where: { chat_id, id: message_ids } }
    );
  },
};
