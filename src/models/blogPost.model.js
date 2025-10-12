import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";

const BlogPost = sequelize.define(
  "BlogPost",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // ✅ Ensures automatic increment for IDs
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
 
      KeyInsights:{
  type: DataTypes.TEXT,
      allowNull: false,
    },
    Implementation:{
  type: DataTypes.TEXT,
      allowNull: false,
    },
      Conclusion:{
  type: DataTypes.TEXT,
      allowNull: false,
    },



    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE", // ✅ added for referential integrity
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    read_time: {
      type: DataTypes.STRING,
      defaultValue: "5 min read", // ✅ good UX default
    },
    meta_description: {
      type: DataTypes.TEXT,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "blog_posts",
    timestamps: false, // ✅ manually controlling created_at / updated_at
    hooks: {
      beforeUpdate: (post) => {
        post.updated_at = new Date(); // ✅ keep updated_at current
      },
    },
  }
);

// 🔗 Associations
User.hasMany(BlogPost, { foreignKey: "author_id", as: "blogPosts" });
BlogPost.belongsTo(User, { foreignKey: "author_id", as: "author" });

export default BlogPost;
