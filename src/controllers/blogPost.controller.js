import { BlogPostService } from "../services/blogPosts.service.js";

export const BlogPostController = {
  async getAll(req, res) {
    try {
      const blogs = await BlogPostService.getAll();
      res.json({ message: "Fetched all blog posts", blogs });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const blog = await BlogPostService.getById(req.params.id);
      if (!blog) return res.status(404).json({ error: "Not found" });
      res.json({blogPost:blog});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const blog = await BlogPostService.create(req.body);
      res.status(201).json(blog);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await BlogPostService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const result = await BlogPostService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
