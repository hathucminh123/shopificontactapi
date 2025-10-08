import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../utils/jwt.js";
import { UserController } from "../controllers/user.controller.js";
const router = Router();
router.get("/profile", authMiddleware, UserController.getProfile);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
