import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Contact = sequelize.define(
  "Contact",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    company: DataTypes.STRING,
    project_type: DataTypes.STRING,
    budget: DataTypes.STRING,
    timeline: DataTypes.STRING,
    message: DataTypes.TEXT,
    source: DataTypes.STRING,
    sequences_opt_in: { type: DataTypes.BOOLEAN, defaultValue: false },
    newsletter_opt_in: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "contacts",
    timestamps: false,
  }
);

export default Contact;
