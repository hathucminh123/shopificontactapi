import pool from "../config/db.js";

export const saveContact = async (data) => {
  const { name, email, company, projectType, budget, timeline, message } = data;

  // Nếu bạn chưa cần DB thì có thể return ngay
  if (!pool) return;

  await pool.query(
    `INSERT INTO contacts (name, email, company, project_type, budget, timeline, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [name, email, company, projectType, budget, timeline, message]
  );
};
