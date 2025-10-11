import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";
import Contact from "./contact.model.js";
import CaseStudy from "./caseStudy.model.js";

const Project = sequelize.define(
  "Project",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    client: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },

    status: {
      type: DataTypes.ENUM("planning", "in-progress", "completed", "on-hold"),
      defaultValue: "planning",
    },

    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    budget: { type: DataTypes.DECIMAL(12, 2) },
    category: { type: DataTypes.STRING },
    featured_image: { type: DataTypes.TEXT },

    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    approved_by: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    contact_id: {
      type: DataTypes.INTEGER,
      references: { model: "contacts", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    case_study_id: {
      type: DataTypes.INTEGER,
      references: { model: "case_studies", key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "projects",
    timestamps: false,
    hooks: {
      beforeUpdate: (project) => {
        project.updated_at = new Date();
      },
    },
    indexes: [
      { fields: ["slug"], unique: true },
      { fields: ["author_id"] },
      { fields: ["contact_id"] },
    ],
  }
);

// Associations
User.hasMany(Project, { foreignKey: "author_id", as: "projects" });
Project.belongsTo(User, { foreignKey: "author_id", as: "author" });

User.hasMany(Project, { foreignKey: "approved_by", as: "approvedProjects" });
Project.belongsTo(User, { foreignKey: "approved_by", as: "approver" });

Contact.hasMany(Project, { foreignKey: "contact_id", as: "projects" });
Project.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

CaseStudy.hasOne(Project, { foreignKey: "case_study_id", as: "project" });
Project.belongsTo(CaseStudy, { foreignKey: "case_study_id", as: "caseStudy" });

export default Project;
