// backend/controllers/AuthController.js

import { AuthService } from '../application/AuthService.js';

/**
 * Controlador HTTP para gerenciar requisições de Autenticação.
 * Garante que a lógica de requisição/resposta (HTTP) fique separada da lógica de negócio (Service).
 */
export class AuthController {
    
    /**
     * @param {AuthService} authService - Serviço de autenticação injetado.
     */
    constructor(authService) {
        if (!(authService instanceof AuthService)) {
            throw new Error("AuthController requer uma instância válida de AuthService.");
        }
        this.authService = authService;
    }

    /**
     * Manipula a requisição POST /auth/register
     */
    async register(req, res) {
        // 🛑 CORREÇÃO AQUI: Recebendo 'name' e 'password' do Front-end
        const { name, email, password, isOrganizador } = req.body;

        // Validação usando os nomes corrigidos
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
        }

        try {
            // Chama o serviço de negócio para processar o registro, passando 'name' e 'password'
            const user = await this.authService.register(name, email, password, isOrganizador);

            // Resposta de sucesso (status 201 Created)
            return res.status(201).json({ 
                message: "Registro realizado com sucesso. Faça login para continuar.",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name, // 🛑 CORREÇÃO AQUI (Retornando 'name')
                    isOrganizador: user.isOrganizador
                }
            });

        } catch (error) {
            // Se o serviço lançar um erro (ex: e-mail duplicado)
            if (error.message.includes('e-mail')) {
                return res.status(409).json({ message: error.message }); // 409 Conflict
            }
            // Erro genérico do servidor
            console.error("Erro no registro:", error);
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

    /**
     * Manipula a requisição POST /auth/login
     */
    async login(req, res) {
        // 🛑 CORREÇÃO AQUI: Recebendo 'password' do Front-end
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
        }

        try {
            // Chama o serviço de negócio para realizar o login e obter o token, passando 'password'
            const result = await this.authService.login(email, password); // Retorna { token, user }

            // Resposta de sucesso
            return res.status(200).json({ 
                message: "Login bem-sucedido.",
                token: result.token,
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    name: result.user.name, // 🛑 CORREÇÃO AQUI (Retornando 'name')
                    isOrganizador: result.user.isOrganizador
                }
            });

        } catch (error) {
            // Erro de credenciais inválidas (lançado pelo AuthService)
            if (error.message.includes('inválidas')) {
                return res.status(401).json({ message: "E-mail ou senha incorretos." }); // 401 Unauthorized
            }
            // Erro genérico do servidor
            console.error("Erro no login:", error);
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}