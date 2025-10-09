import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import pg from "pg";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: process.env.NODE_ENV === "production" ? false : console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // cần cho Neon SSL
    },
  },
  define: {
    schema: "public", // Neon luôn dùng schema public
  },
});

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default sequelize;
