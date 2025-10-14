import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import ChatSession from "./chat_sessions.model.js";

const ChatMessage = sequelize.define(
  "ChatMessage",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "chat_sessions", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    sender_type: {
      type: DataTypes.ENUM("user", "contact", "system"),
      defaultValue: "contact",
    },
    sender_id: { type: DataTypes.INTEGER, allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    attachments: { type: DataTypes.JSONB },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "chat_messages", timestamps: false }
);

ChatSession.hasMany(ChatMessage, { foreignKey: "chat_id", as: "messages" });
ChatMessage.belongsTo(ChatSession, { foreignKey: "chat_id", as: "chat" });

export default ChatMessage;
