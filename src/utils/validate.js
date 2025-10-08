/**
 * Validate đơn giản (có thể thay bằng zod/yup nếu muốn).
 */
export const validateContact = (body) => {
  const errors = [];

  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim();
  const message = (body?.message || "").trim();

  if (name.length < 2) errors.push("Name is too short");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email");
  if (message.length < 5) errors.push("Message is too short");

  if (errors.length) return { ok: false, error: errors.join("; ") };

  return {
    ok: true,
    data: {
      name,
      email,
      company: body?.company?.trim() || "",
      projectType: body?.projectType?.trim() || "",
      budget: body?.budget?.trim() || "",
      timeline: body?.timeline?.trim() || "",
      message,
    },
  };
};

// Example middleware (Express)
export const canManageResource = (req, res, next) => {
  const user = req.user; // from JWT
  if (user.role_id === 1 || user.role_id === 3) return next(); // Admin or Marketing
  return res.status(403).json({ error: "Access denied" });
};

export const canManageCaseStudy = (req, res, next) => {
  const user = req.user;
  if (user.role_id === 1 || user.role_id === 2 || user.role_id === 3) return next(); // Admin, Editor, Marketing
  return res.status(403).json({ error: "Access denied" });
};

export const canManageBlog = (req, res, next) => {
  const { role_id } = req.user;
  if ([1, 2, 3].includes(role_id)) return next(); // admin, editor, marketing
  return res.status(403).json({ error: "Access denied" });
};
