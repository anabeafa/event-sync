import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; 

export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
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

export const isOrganizador = (req, res, next) => {
    if (req.user && req.user.isOrganizador) {
        next();
    } else {
        return res.status(403).json({ message: 'Acesso negado. Esta ação é exclusiva para Organizadores.' });
    }
};