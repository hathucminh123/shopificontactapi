import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";
import Project from "./project.model.js";

const ProjectTask = sequelize.define(
  "ProjectTask",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "projects", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "review", "done"),
      defaultValue: "todo",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "urgent"),
      defaultValue: "medium",
    },
    assignee_id: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: true,
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    due_date: { type: DataTypes.DATE, allowNull: true },
    order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "project_tasks",
    timestamps: false,
    hooks: {
      beforeUpdate: (t) => (t.updated_at = new Date()),
    },
  }
);

// Relations
Project.hasMany(ProjectTask, { foreignKey: "project_id", as: "tasks" });
ProjectTask.belongsTo(Project, { foreignKey: "project_id", as: "project" });

User.hasMany(ProjectTask, { foreignKey: "assignee_id", as: "assignedTasks" });
ProjectTask.belongsTo(User, { foreignKey: "assignee_id", as: "assignee" });

export default ProjectTask;
