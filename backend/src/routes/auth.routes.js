import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { AuthService } from "../application/AuthService.js";
import { InMemoryUserRepository } from "../infra/InMemoryUserRepository.js";

const router = Router();

const userRepository = new InMemoryUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

export default router;
