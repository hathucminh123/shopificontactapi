import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";
import Contact from "./contact.model.js";

const ChatSession = sequelize.define(
  "ChatSession",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "contacts", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    chat_type: {
      type: DataTypes.ENUM("guest", "support", "project"),
      defaultValue: "guest",
    },
    status: {
      type: DataTypes.ENUM("open", "closed", "archived"),
      defaultValue: "open",
    },
    last_message: { type: DataTypes.TEXT },
    started_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ended_at: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "chat_sessions",
    timestamps: false,
    hooks: {
      beforeUpdate: (s) => (s.updated_at = new Date()),
    },
  }
);

// Relations
User.hasMany(ChatSession, { foreignKey: "user_id", as: "userChats" });
ChatSession.belongsTo(User, { foreignKey: "user_id", as: "user" });

Contact.hasMany(ChatSession, { foreignKey: "contact_id", as: "contactChats" });
ChatSession.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

export default ChatSession;
