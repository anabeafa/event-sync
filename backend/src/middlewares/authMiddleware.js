import jwt from 'jsonwebtoken';

// Garanta que JWT_SECRET está carregado no seu .env e lido pelo server.js
const JWT_SECRET = process.env.JWT_SECRET; 

/**
 * Middleware para verificar a validade do token JWT.
 * O payload do token (contendo id, email, isOrganizador) é anexado a req.user.
 */
export const protect = (req, res, next) => {
    let token;

    // O token é esperado no header Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Obter o token
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificar o token
            const decoded = jwt.verify(token, JWT_SECRET);

            // 3. Anexar o payload do usuário à requisição (req.user)
            req.user = decoded; 

            next();

        } catch (error) {
            console.error('Erro de Autenticação:', error);
            return res.status(401).json({ message: 'Não autorizado, token inválido ou expirado.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
    }
};

/**
 * Middleware para garantir que o usuário logado é um organizador.
 */
export const isOrganizador = (req, res, next) => {
    // Verifica se o protect já rodou e se o usuário tem o flag isOrganizador
    if (req.user && req.user.isOrganizador) {
        next();
    } else {
        return res.status(403).json({ message: 'Acesso negado. Esta ação é exclusiva para Organizadores.' });
    }
};