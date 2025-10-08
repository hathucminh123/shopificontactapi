import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";

const CaseStudy = sequelize.define("CaseStudy", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  slug: { type: DataTypes.TEXT, allowNull: false, unique: true },
  title: { type: DataTypes.TEXT, allowNull: false },
  client: { type: DataTypes.TEXT, allowNull: false },
  logo_url: { type: DataTypes.TEXT },
   image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  excerpt: { type: DataTypes.TEXT, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.TEXT, allowNull: false },
  link: { type: DataTypes.TEXT },
  metrics: { type: DataTypes.JSONB },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  published: { type: DataTypes.BOOLEAN, defaultValue: true },
  author_id: { type: DataTypes.INTEGER, references: { model: "users", key: "id" } },
  approved_by: { type: DataTypes.INTEGER, references: { model: "users", key: "id" } },
}, {
  tableName: "case_studies",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

// 🔗 Relations
User.hasMany(CaseStudy, { foreignKey: "author_id", as: "caseStudies" });
CaseStudy.belongsTo(User, { foreignKey: "author_id", as: "author" });

User.hasMany(CaseStudy, { foreignKey: "approved_by", as: "approvedCaseStudies" });
CaseStudy.belongsTo(User, { foreignKey: "approved_by", as: "approver" });

export default CaseStudy;
