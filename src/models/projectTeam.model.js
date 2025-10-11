import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./project.model.js";
import User from "./users.model.js";

const ProjectTeam = sequelize.define(
  "ProjectTeam",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "projects", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    role: {
      type: DataTypes.ENUM("developer", "designer", "pm", "qa", "client"),
      defaultValue: "developer",
    },
    joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "project_team",
    timestamps: false,
  }
);

// ✅ FIX: Associations (Sequelize needs belongsTo for include)
ProjectTeam.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

ProjectTeam.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

// ✅ (Optional) reverse relations
Project.hasMany(ProjectTeam, {
  foreignKey: "project_id",
  as: "team",
});

User.hasMany(ProjectTeam, {
  foreignKey: "user_id",
  as: "teams",
});

export default ProjectTeam;
