import { Router } from 'express';
import { AuthService } from '../application/AuthService.js';
import { AuthController } from '../controllers/AuthController.js';
export default function authRoutesFactory(prisma, userRepository) {

    const authService = new AuthService(userRepository); 

    const authController = new AuthController(authService);
    
    const router = Router();

    router.post('/register', (req, res) => authController.register(req, res));
    

    router.post('/login', (req, res) => authController.login(req, res));
    
    return router;
}