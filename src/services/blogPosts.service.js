import BlogPost from "../models/blogPost.model.js";

export const BlogPostService = {
  async getAll() {
    return BlogPost.findAll({ include: ["author"] });
  },

  async getById(id) {
    return BlogPost.findByPk(id, { include: ["author"] });
  },

  async create(data) {
    return BlogPost.create(data);
  },

  async update(id, updates) {
    const blog = await BlogPost.findByPk(id);
    if (!blog) throw new Error("Blog post not found");
    return blog.update(updates);
  },

  async delete(id) {
    const blog = await BlogPost.findByPk(id);
    if (!blog) throw new Error("Blog post not found");
    await blog.destroy();
    return { message: "Deleted successfully" };
  },
};
