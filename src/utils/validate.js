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
