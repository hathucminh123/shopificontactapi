import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import pg from "pg"; // 🟢 thêm dòng này

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg, // 🟢 thêm dòng này
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default sequelize;
