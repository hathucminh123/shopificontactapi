import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Contact from "./contact.model.js";

const ResourceDownload = sequelize.define(
  "ResourceDownload",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contact_id: {
      type: DataTypes.INTEGER,
      references: { model: "contacts", key: "id" },
      allowNull: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    resource_title: { type: DataTypes.STRING, allowNull: false },
    downloaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "resource_downloads", timestamps: false }
);

// 🔗 Relationships
Contact.hasMany(ResourceDownload, { foreignKey: "contact_id", as: "downloads" });
ResourceDownload.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

export default ResourceDownload;
