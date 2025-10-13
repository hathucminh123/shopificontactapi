import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";

const Resource = sequelize.define(
  "Resource",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tag: {
      type: DataTypes.TEXT,
    },

    type: {
      type: DataTypes.ENUM("view", "download"),
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
    },

    gated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    category: {
      type: DataTypes.ENUM("ebook", "conference", "webinar", "case-study"),
      allowNull: false,
    },

    // 🖼️ Image fields
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hero_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // 📅 Optional display/sort date
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    file_url: {
      type: DataTypes.TEXT,
    },

    // 📊 Analytics tracking
    downloads: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    // 👤 Author & approver
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    approved_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "resources",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

//
// 🔗 Relations
//
User.hasMany(Resource, { foreignKey: "author_id", as: "resources" });
Resource.belongsTo(User, { foreignKey: "author_id", as: "author" });

User.hasMany(Resource, { foreignKey: "approved_by", as: "approvedResources" });
Resource.belongsTo(User, { foreignKey: "approved_by", as: "approver" });

export default Resource;
