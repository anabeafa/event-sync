// backend/src/routes/auth.routes.js

import { Router } from 'express';

// Importações DDD
import { AuthService } from '../application/AuthService.js';
import { AuthController } from '../controllers/AuthController.js';

/**
 * Função Factory que cria as rotas de autenticação (login/register),
 * recebendo o prisma e o userRepository por injeção de dependência.
 */
export default function authRoutesFactory(prisma, userRepository) {
    
    // =========================================================
    // 🛑 INJEÇÃO DE DEPENDÊNCIA (Resolvendo a criação das classes)
    // =========================================================
    
    // O AuthService precisa do UserRepository para buscar/criar o usuário
    const authService = new AuthService(userRepository); 
    
    // O AuthController precisa do AuthService para executar a lógica
    const authController = new AuthController(authService);
    
    const router = Router();

    // =========================================================
    // 🛑 ROTAS DE AUTENTICAÇÃO (Onde você precisa das rotas)
    // =========================================================
    
    // Rota POST /auth/register (Para criar a conta)
    router.post('/register', (req, res) => authController.register(req, res));
    
    // Rota POST /auth/login (Para fazer o login)
    router.post('/login', (req, res) => authController.login(req, res));
    
    return router;
}