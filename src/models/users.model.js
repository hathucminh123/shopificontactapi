import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";
import Role from "./role.model.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },

    phone: {
      type: DataTypes.STRING(30),
    },

    avatar_url: {
      type: DataTypes.TEXT,
    },

  status: {
  type: DataTypes.ENUM("active", "inactive", "suspended"),
  defaultValue: "active",
},

    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    reset_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    email_verified_at: {
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
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password_hash")) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
    },
  }
);

// 🔗 Relationship: Role → Users (One-to-Many)
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

// 🧠 Password checker
User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password_hash);
};

export default User;
