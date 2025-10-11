import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./project.model.js";
import Resource from "./resource.model.js";

// 🔗 Bảng trung gian project_resources
const ProjectResource = sequelize.define(
  "ProjectResource",
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
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "resources", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    linked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "project_resources",
    timestamps: false,
  }
);

// ✅ Associations
Project.belongsToMany(Resource, {
  through: ProjectResource,
  foreignKey: "project_id",
  as: "resources",
});

Resource.belongsToMany(Project, {
  through: ProjectResource,
  foreignKey: "resource_id",
  as: "projects",
});

// ✅ Cần cho include() hoạt động
ProjectResource.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

ProjectResource.belongsTo(Resource, {
  foreignKey: "resource_id",
  as: "resource",
});

Project.hasMany(ProjectResource, {
  foreignKey: "project_id",
  as: "projectResources",
});

Resource.hasMany(ProjectResource, {
  foreignKey: "resource_id",
  as: "resourceLinks",
});

export default ProjectResource;
