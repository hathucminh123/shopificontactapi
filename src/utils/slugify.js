export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

export const ensureSlug = (name, slug) => slug && slug.length ? slug : slugify(name || "");
