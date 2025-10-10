import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Contact from "./contact.model.js";

const EmailSequence = sequelize.define(
  "EmailSequence",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "contacts", key: "id" },
    },
    sequence_type: { type: DataTypes.STRING, allowNull: false },
    email_number: DataTypes.INTEGER,
    status: { type: DataTypes.STRING, defaultValue: "scheduled" },
    scheduled_at: DataTypes.DATE,
    sent_at: DataTypes.DATE,
    attempts: { type: DataTypes.INTEGER, defaultValue: 0 }, // retry count
    last_error: { type: DataTypes.TEXT }, // store last error message
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "email_sequences", timestamps: false }
);

// 🔗 Relationships
Contact.hasMany(EmailSequence, { foreignKey: "contact_id", as: "emailSequences" });
EmailSequence.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

export default EmailSequence;
