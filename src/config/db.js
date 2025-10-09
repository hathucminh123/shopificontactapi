import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import pg from "pg"; // cần cho Neon

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg, // dùng pg của Neon
  logging: !isProduction, // log SQL khi ở dev
  dialectOptions: {
    ssl: isProduction
      ? {
          require: true,
          rejectUnauthorized: false, // cần cho Neon SSL
        }
      : false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default sequelize;
