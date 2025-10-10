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
// import { Sequelize } from "sequelize";
// import pg from "pg";
// import dotenv from "dotenv";

// const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
// dotenv.config({ path: envFile });

// const isProd = process.env.NODE_ENV === "production";

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   dialectModule: pg,
//   logging: isProd ? false : console.log,
//   dialectOptions: isProd
//     ? {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false, // cần cho Neon SSL
//         },
//       }
//     : {},
//   define: {
//     schema: "public",
//   },
// });

// sequelize
//   .authenticate()
//   .then(() => console.log("✅ PostgreSQL connected successfully"))
//   .catch((err) => console.error("❌ Database connection error:", err));

// export default sequelize;
