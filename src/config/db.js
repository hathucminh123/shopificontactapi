import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import pg from "pg";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
logging: isProduction ? false : console.log,
 // log SQL khi ở dev
  dialectOptions: {
    ssl: isProduction
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
  define: {
    schema: "public", // 🔒 tránh lỗi schema trên Neon
  },
});

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default sequelize;
